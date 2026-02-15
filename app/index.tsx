import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../src/firebaseConnection";

import { CadastroScreen } from "../screens/CadastroScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { UserDashboard } from "../screens/UserDashboard";

type User = { email: string | null; uid: string };

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? { email: user.email, uid: user.uid } : null);
    });
    return unsub;
  }, []);

  if (authUser) {
    // usuário logado vai direto para a segunda tela
    return <UserDashboard />;
  }

  if (showCadastro) {
    return (
      <CadastroScreen
        onCadastroSuccess={(email, uid) => {
          setAuthUser({ email, uid });
          setShowCadastro(false);
        }}
        onVoltar={() => setShowCadastro(false)}
      />
    );
  }

  return (
    <LoginScreen
      onNavigateToCadastro={() => setShowCadastro(true)}
      onLoginSuccess={(email, uid) => setAuthUser({ email, uid })}
    />
  );
}
