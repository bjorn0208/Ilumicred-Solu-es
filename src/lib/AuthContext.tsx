import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase';

export interface SimulationData {
  id: string;
  name: string;
  telefone: string;
  sonho: string;
  servico: string;
  negativado: string;
  valorDividas: string;
  userId: string;
  createdAt: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  simulations: SimulationData[];
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveSimulation: (data: Omit<SimulationData, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState<SimulationData[]>([]);

  // Monitor Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Track/Sync User profile in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
          photoURL: currentUser.photoURL || '',
          createdAt: new Date().toISOString()
        };
        
        try {
          // Write using our standard setDoc
          await setDoc(userDocRef, userData);
        } catch (error) {
          console.error("Failed to sync user profile in DB:", error);
        }
      } else {
        setSimulations([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Monitor / Listen to real-time simulations collection changes
  useEffect(() => {
    if (!user) {
      setSimulations([]);
      return;
    }

    const simulationsPath = `users/${user.uid}/simulations`;
    const simulationsRef = collection(db, 'users', user.uid, 'simulations');
    
    // Subscribe to snapshot
    const unsubscribe = onSnapshot(
      simulationsRef,
      (snapshot) => {
        const list: SimulationData[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.name || '',
            telefone: data.telefone || '',
            sonho: data.sonho || '',
            servico: data.servico || '',
            negativado: data.negativado || '',
            valorDividas: data.valorDividas || '',
            userId: data.userId || '',
            createdAt: data.createdAt || ''
          });
        });
        
        // Sort by local created time or key if needed
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSimulations(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, simulationsPath);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Google Authentication Sign In
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  // Google Authentication Sign Out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Save Simulation Data to Firestore
  const saveSimulation = async (
    data: Omit<SimulationData, 'id' | 'userId' | 'createdAt'>
  ): Promise<string> => {
    if (!user) {
      throw new Error("User must be authenticated to save a simulation.");
    }

    const simulationsPath = `users/${user.uid}/simulations`;
    try {
      const simulationsRef = collection(db, 'users', user.uid, 'simulations');
      
      const new仿真Document = {
        name: data.name,
        telefone: data.telefone,
        sonho: data.sonho,
        servico: data.servico,
        negativado: data.negativado,
        valorDividas: data.valorDividas,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };

      // Add document to subcollection
      const docRef = await addDoc(simulationsRef, new仿真Document);
      
      // Update with exact ID to match schema rule on consistency if needed
      await setDoc(doc(db, 'users', user.uid, 'simulations', docRef.id), {
        ...new仿真Document,
        id: docRef.id
      });

      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, simulationsPath);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, simulations, signInWithGoogle, logout, saveSimulation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
