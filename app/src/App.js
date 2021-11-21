import React from 'react';
import { Provider as BumbagProvider,ToastManager } from 'bumbag';
import theme from './theme';
import { AppRouter } from 'routers/AppRouter';
import { SidebarProvider } from 'context/SidebarContext';
import { AuthProvider } from 'context/AuthContext';
import { Provider as ProviderJotai } from 'jotai';
import { QueryClientProvider, QueryClient } from 'react-query';
import store, { history } from "Redux/store/store";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProviderJotai>
      <BumbagProvider theme={theme}>
        <AuthProvider>
          <SidebarProvider>
            <AppRouter history = {history} store = {store} />
          </SidebarProvider>
        </AuthProvider>
        <ToastManager />
      </BumbagProvider>
    </ProviderJotai>
  </QueryClientProvider>
);

export default App;
