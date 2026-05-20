"use client";

import React, { useState, useEffect, useMemo } from 'react';
// ...imports
import { Menu, X, Settings, Box, Database, LayoutTemplate, Activity, Plus, Play, Cpu, Layers, UploadCloud, ShieldAlert, ArrowLeft, StopCircle, PauseCircle, Users, GitBranch, Code, Copy, CheckCircle2, Download, Search, RefreshCw, MessageSquare, History, Terminal, Key, ChevronLeft, ChevronRight, GitMerge, GitPullRequest, GitCommit, FileCode, Server, ListFilter, File, FileText, CheckSquare, FileSpreadsheet, StickyNote, FolderOpen, ClipboardList, ToggleRight, ToggleLeft, Flame, ExternalLink, BarChart3, Cloud, LineChart as LineChartIcon, CreditCard, Lock, HelpCircle, Store, Star, StarHalf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function SubscriptionConfirmationModal({ isOpen, item, onConfirm, isLoading, error, onCancel }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-2">Confirm Subscription</h2>
        <p className="text-sm text-slate-400 mb-6 font-mono leading-relaxed">
          You are about to subscribe to the <strong className="text-white">{item?.name}</strong> plan for {item?.pricing}. Your payment method on file will be charged automatically.
        </p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded mb-4 font-mono">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 relative z-10">
          <button 
            disabled={isLoading}
            onClick={onCancel} 
            className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded text-xs font-bold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            disabled={isLoading}
            onClick={onConfirm} 
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400/50 text-white rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center"
          >
            {isLoading ? <><RefreshCw className="w-3 h-3 mr-2 animate-spin" /> Processing...</> : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionCard({ 
  id, name, description, icon: Icon, colorIcon, priceObj, 
  isSubscribed, isPackage,
  onSubscribeClick 
}: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col items-center text-center hover:border-slate-700 transition">
      <div className={`w-12 h-12 ${colorIcon.bg} rounded-full flex items-center justify-center border ${colorIcon.border} mb-4`}>
        <Icon className={`w-6 h-6 ${colorIcon.text}`} />
      </div>
      <h4 className="text-lg font-bold text-slate-200">{name}</h4>
      <p className="text-xs text-slate-500 font-mono mt-1 mb-6 flex-1">{description}</p>
      
      <div className="space-y-3 w-full mt-auto">
        <button 
          onClick={() => { if (!isSubscribed) onSubscribeClick(); }}
          className={`w-full ${isPackage ? 'py-3 text-sm' : 'py-2 text-xs'} rounded font-bold uppercase tracking-widest transition-colors border ${
            isSubscribed 
              ? `${colorIcon.bg} ${colorIcon.text} ${colorIcon.border}` 
              : isPackage 
                ? `${colorIcon.bgActive} text-white hover:brightness-110` 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
        >
          {isSubscribed ? 'Active (Monthly)' : priceObj.monthly}
        </button>
        <button 
          className="w-full py-2 rounded text-xs font-bold transition-colors border bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-800 disabled:opacity-50" 
          disabled={isSubscribed}
        >
          {priceObj.weekly}
        </button>
        {priceObj.daily && (
          <button 
            className="w-full py-2 rounded text-xs font-bold transition-colors border bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-800 disabled:opacity-50" 
            disabled={isSubscribed}
          >
            {priceObj.daily}
          </button>
        )}
      </div>
    </div>
  );
}

const INITIAL_TRAINING_DATA = [
  { epoch: 1, accuracy: 30, loss: 0.9 },
  { epoch: 2, accuracy: 45, loss: 0.7 },
  { epoch: 3, accuracy: 60, loss: 0.5 },
  { epoch: 4, accuracy: 72, loss: 0.35 },
  { epoch: 5, accuracy: 80, loss: 0.25 },
];

const INITIAL_TRAINING_DATA_CODER = [
  { epoch: 1, accuracy: 50, loss: 0.8 },
  { epoch: 2, accuracy: 65, loss: 0.6 },
  { epoch: 3, accuracy: 75, loss: 0.4 },
  { epoch: 4, accuracy: 85, loss: 0.25 },
  { epoch: 5, accuracy: 92, loss: 0.15 },
];

export default function SuperAI() {
  const [activeTab, setActiveTab] = useState('models');
  const [models, setModels] = useState([
    { id: 1, name: 'Customer Sentiment LLM', type: 'Language', status: 'Deployed', accuracy: '94.2%', dataset: 'ds_support_log' },
    { id: 2, name: 'Product Vision Classifier', type: 'Vision', status: 'Training', accuracy: '-', dataset: 'ds_vision_v2' },
    { id: 3, name: 'AI Coder Pro', type: 'Code', status: 'Training', accuracy: '-', dataset: 'ds_professional_coding' },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newModel, setNewModel] = useState({ name: '', type: 'Language', dataset: '' });
  
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const [marketplaceModels, setMarketplaceModels] = useState([
    { id: 101, name: 'Medical NLP Specialist', author: 'HealthAI Corp', type: 'Language', price: 50, rating: 4.8, description: 'Fine-tuned LLM for medical diagnosis extraction. Excellent performance on medical journals and electronic health records.', reviews: [{user: 'dr_john', comment: 'Very accurate! Saves me hours of note reading.', rating: 5}] },
    { id: 102, name: 'Retail Object Detector', author: 'Visionary', type: 'Vision', price: 120, rating: 4.5, description: 'Detect over 500 common retail objects like carts, shelves, brands, and people with 99% accuracy on typical CCTV angles.', reviews: [] },
  ]);
  const [showMarketplaceModal, setShowMarketplaceModal] = useState<number | null>(null);
  const [publishForm, setPublishForm] = useState({ price: 0, description: '' });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [selectedMarketplaceModel, setSelectedMarketplaceModel] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [marketFilterType, setMarketFilterType] = useState('All');
  const [marketSortBy, setMarketSortBy] = useState('rating');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'owner' | 'user' | null>(null);
  const [currentUsername, setCurrentUsername] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<{username: string, password: string}[]>([]);
  const [mounted, setMounted] = useState(false);

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUsers = localStorage.getItem('superai_users');
    if (storedUsers) {
      try { setRegisteredUsers(JSON.parse(storedUsers)); } catch(e) {}
    }
    const authStatus = localStorage.getItem('superai_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setCurrentUserRole(localStorage.getItem('superai_role') as any);
      setCurrentUsername(localStorage.getItem('superai_username') || '');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginUsername.length < 3) {
      setLoginError('Username must be at least 3 characters');
      return;
    }
    if (loginPassword.length < 5) {
      setLoginError('Password must be at least 5 characters');
      return;
    }

    setIsLoginLoading(true);

    setTimeout(() => {
      setIsLoginLoading(false);
      if (isRegistering) {
        if (loginUsername.startsWith('Dev') || registeredUsers.some(u => u.username === loginUsername)) {
          setLoginError('Username unavailable');
          return;
        }
        const newUsers = [...registeredUsers, { username: loginUsername, password: loginPassword }];
        setRegisteredUsers(newUsers);
        localStorage.setItem('superai_users', JSON.stringify(newUsers));
        setCurrentUsername(loginUsername);
        setCurrentUserRole('user');
        setIsAuthenticated(true);
        localStorage.setItem('superai_auth', 'true');
        localStorage.setItem('superai_role', 'user');
        localStorage.setItem('superai_username', loginUsername);
        return;
      }

      if (loginUsername === 'Dev-Bigdik' && loginPassword === 'DigBik') {
        setIsAuthenticated(true);
        setCurrentUserRole('owner');
        setCurrentUsername(loginUsername);
        localStorage.setItem('superai_auth', 'true');
        localStorage.setItem('superai_role', 'owner');
        localStorage.setItem('superai_username', loginUsername);
        return;
      }
      
      // Check low admin multi-login
      for (let i = 1; i <= 6; i++) {
         if (loginUsername === `DevAss${i}` && loginPassword === `AssDev${i}`) {
           setIsAuthenticated(true);
           setCurrentUserRole('admin');
           setCurrentUsername(loginUsername);
           localStorage.setItem('superai_auth', 'true');
           localStorage.setItem('superai_role', 'admin');
           localStorage.setItem('superai_username', loginUsername);
           return;
         }
      }

      const user = registeredUsers.find(u => u.username === loginUsername && u.password === loginPassword);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUserRole('user');
        setCurrentUsername(loginUsername);
        localStorage.setItem('superai_auth', 'true');
        localStorage.setItem('superai_role', 'user');
        localStorage.setItem('superai_username', loginUsername);
        return;
      }
      
      setLoginError('Invalid credentials');
    }, 1200);
  };
  
  const [modelsData, setModelsData] = useState<Record<number, { epoch: number, accuracy: number, loss: number }[]>>({
    2: INITIAL_TRAINING_DATA,
    3: INITIAL_TRAINING_DATA_CODER
  });
  const [pausedModels, setPausedModels] = useState<Record<number, boolean>>({});

  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [isViewingVersions, setIsViewingVersions] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Playground state
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundMessages, setPlaygroundMessages] = useState<{role: string, content: string}[]>([]);
  const [playgroundSelectedModel, setPlaygroundSelectedModel] = useState<number | null>(1); // default to first model

  // Git Integration State
  const [gitSubTab, setGitSubTab] = useState('overview');
  const [gitBranches, setGitBranches] = useState([{ name: 'main', current: true }, { name: 'experiment/vision-transformer', current: false }, { name: 'fix/adam-lr', current: false }]);
  const [gitRemotes, setGitRemotes] = useState([{ name: 'origin', url: 'https://github.com/superai-org/vision-models.git' }]);
  const [gitignoreContent, setGitignoreContent] = useState('# Artifacts\nmodels/\ncheckpoints/\n*.pth\n*.pt\n\n# Data\ndata/\n*.csv\n\n# Temp\n.DS_Store\n__pycache__/\n');
  const [gitHooksContent, setGitHooksContent] = useState('#!/bin/sh\n# pre-commit hook\necho "Running checks..."\n# Your custom pre-commit logic');

  const handlePlaygroundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundInput.trim()) return;
    
    const newMessages = [...playgroundMessages, { role: 'user', content: playgroundInput }];
    setPlaygroundMessages([...newMessages, { role: 'model', content: "Generating response..." }]);
    setPlaygroundInput('');
    
    try {
      const selectedModelInfo = models.find(m => m.id === playgroundSelectedModel);
      
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           prompt: newMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
           modelType: selectedModelInfo?.type || 'Language',
           modelName: selectedModelInfo?.name || 'Unknown Model',
           dataset: selectedModelInfo?.dataset || 'unknown_dataset',
        })
      });
      const data = await response.json();
      
      setPlaygroundMessages([...newMessages, { 
        role: 'model', 
        content: data.text || "No response generated."
      }]);
    } catch (error) {
       console.error("Playground error:", error);
       setPlaygroundMessages([...newMessages, { 
         role: 'model', 
         content: "Error: Could not connect to model inference endpoints."
       }]);
    }
  };

  const modelsRef = React.useRef(models);
  const pausedModelsRef = React.useRef(pausedModels);

  useEffect(() => {
    modelsRef.current = models;
  }, [models]);

  useEffect(() => {
    pausedModelsRef.current = pausedModels;
  }, [pausedModels]);

  useEffect(() => {
    const interval = setInterval(() => {
      setModelsData(prevData => {
        let hasChanges = false;
        const newData = { ...prevData };
        modelsRef.current.forEach(m => {
           if (m.status === 'Training' && !pausedModelsRef.current[m.id]) {
              const dataList = newData[m.id] || [{ epoch: 1, accuracy: 10, loss: 1.0 }];
              const last = dataList[dataList.length - 1];
              if (last.epoch < 100) {
                 hasChanges = true;
                 const newEpoch = last.epoch + 1;
                 const newAcc = Math.min(99.9, last.accuracy + (Math.random() * 3));
                 const newLoss = Math.max(0.01, last.loss - (Math.random() * 0.05));
                 newData[m.id] = [...dataList.slice(-50), { epoch: newEpoch, accuracy: newAcc, loss: newLoss }];
              }
           }
        });
        return hasChanges ? newData : prevData;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const [userSubscriptions, setUserSubscriptions] = useState<string[]>([]);
  const [pendingSubscription, setPendingSubscription] = useState<any>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');

  const handleConfirmSubscription = () => {
    setSubscriptionError('');
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      // Simulate random error for demonstration
      if (Math.random() < 0.2) {
        setSubscriptionError('Payment processor declined the transaction. Please check your billing details.');
        return;
      }
      
      setUserSubscriptions([...userSubscriptions, ...pendingSubscription.id.split(',')]);
      setPendingSubscription(null);
    }, 1500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUserRole === 'user') {
       if (['MetaHuman', 'Gaussian', 'GenVideo', 'Glypheral'].includes(newModel.type)) {
          const requiredSub = newModel.type.toLowerCase();
          if (!userSubscriptions.includes(requiredSub) && !userSubscriptions.includes('ultra') && !userSubscriptions.includes('ultramite')) {
             alert(`You do not have a subscription for ${newModel.type} models. Please visit the Subscriptions tab to purchase access.`);
             return;
          }
       }
    }

    const newId = models.length > 0 ? Math.max(...models.map(m => m.id)) + 1 : 1;
    setModels([...models, { id: newId, name: newModel.name, type: newModel.type, status: 'Training', accuracy: '-', dataset: newModel.dataset }]);
    setModelsData(prev => ({
      ...prev,
      [newId]: [{ epoch: 1, accuracy: 1, loss: 1.5 }]
    }));
    setIsCreating(false);
    setNewModel({ name: '', type: 'Language', dataset: '' });
  };
  
  const currentModel = models.find(m => m.id === selectedModel);
  const trainingData = selectedModel ? (modelsData[selectedModel] || []) : [];

  const filteredAndSortedMarketplaceModels = useMemo(() => {
     let result = marketplaceModels;
     if (marketFilterType !== 'All') {
         result = result.filter(m => m.type === marketFilterType);
     }
     result = [...result].sort((a, b) => {
         if (marketSortBy === 'rating') {
             return b.rating - a.rating;
         } else if (marketSortBy === 'price_asc') {
             return a.price - b.price;
         } else if (marketSortBy === 'price_desc') {
             return b.price - a.price;
         } else if (marketSortBy === 'popularity') {
             return b.reviews.length - a.reviews.length;
         }
         return 0;
     });
     return result;
  }, [marketplaceModels, marketFilterType, marketSortBy]);

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-[#0F172A] text-slate-300 font-sans items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-lg w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-slate-950 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight text-center">{isRegistering ? 'SuperAI Registration' : 'SuperAI Login'}</h1>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Username</label>
              <input 
                type="text" 
                value={loginUsername} 
                onChange={e => setLoginUsername(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder={isRegistering ? "Choose a username" : "Enter username"}
                disabled={isLoginLoading}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Password</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={e => setLoginPassword(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder={isRegistering ? "Choose a password" : "Enter password"}
                disabled={isLoginLoading}
              />
            </div>
            {loginError && <p className="text-red-400 text-xs font-mono">{loginError}</p>}
            <button 
              type="submit" 
              disabled={isLoginLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:text-cyan-400/50 text-white font-bold py-2 rounded text-xs uppercase tracking-widest transition-colors mt-4 relative flex items-center justify-center"
            >
              {isLoginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {isRegistering ? 'Creating...' : 'Signing In...'}
                </>
              ) : (
                isRegistering ? 'Create Account' : 'Sign In'
              )}
            </button>
            <div className="text-center mt-4">
              <button 
                type="button" 
                disabled={isLoginLoading}
                onClick={() => { setIsRegistering(!isRegistering); setLoginError(''); setLoginUsername(''); setLoginPassword(''); }} 
                className="text-xs text-slate-500 hover:text-cyan-400 transition-colors mb-4 disabled:opacity-50"
              >
                {isRegistering ? 'Already have an account? Sign in' : 'New user? Create account'}
              </button>
              {!isRegistering && (
                <div className="text-[10px] text-slate-500 font-mono mt-2 bg-slate-900 border border-slate-800 p-2 rounded text-left">
                  <p className="mb-1 text-slate-400 text-center border-b border-slate-800 pb-1">Demo Owner Account</p>
                  <div className="flex justify-between mt-1">
                     <span>User: Dev-Bigdik</span><span>Pass: DigBik</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} hidden md:flex transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-900/20 flex-col shrink-0`}>
        <div className={`h-12 flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} border-b border-slate-800 shrink-0`}>
          <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center shrink-0">
            <div className="w-3 h-3 bg-slate-950 rounded-full" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col ml-2 overflow-hidden whitespace-nowrap">
              <span className="font-bold text-white tracking-tight text-lg leading-tight">SuperAI</span>
              {currentUserRole && (
                <span className="text-[10px] font-mono uppercase text-cyan-400">
                  {currentUserRole === 'owner' ? 'Head Dev / Owner' : 
                   currentUserRole === 'admin' ? 'Low Admin Session' : 'User Session'}
                </span>
              )}
            </div>
          )}
        </div>
        <nav className={`flex-1 overflow-y-auto overflow-x-hidden ${isSidebarOpen ? 'p-4' : 'py-4 px-2'}`}>
          {isSidebarOpen && <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 whitespace-nowrap">Modules</div>}
          <div className="space-y-1">
            {[
              { id: 'dashboard', icon: Activity, label: 'Dashboard', roles: ['owner', 'admin', 'user'] },
              { id: 'models', icon: Box, label: 'Models', roles: ['owner', 'admin', 'user'] },
              { id: 'datasets', icon: Database, label: 'Datasets', roles: ['owner', 'admin', 'user'] },
              { id: 'templates', icon: LayoutTemplate, label: 'Templates', roles: ['owner', 'admin'] },
              { id: 'marketplace', icon: Store, label: 'Marketplace', roles: ['owner', 'admin', 'user'] },
              { id: 'playground', icon: Terminal, label: 'Playground', roles: ['owner', 'admin', 'user'] },
              { id: 'team', icon: Users, label: 'Team & Access', roles: ['owner'] },
              { id: 'git', icon: GitBranch, label: 'Git Integration', roles: ['owner', 'admin'] },
              { id: 'api', icon: Code, label: 'API Access', roles: ['owner', 'admin'] },
              { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions', roles: ['user'] },
            ].filter(item => item.roles.includes(currentUserRole || 'user')).map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedModel(null); }}
                title={!isSidebarOpen ? item.label : undefined}
                className={`w-full flex items-center ${isSidebarOpen ? 'px-3 py-2' : 'justify-center py-3'} text-sm rounded transition-colors ${
                  activeTab === item.id 
                  ? 'bg-slate-800 border border-slate-700 text-white' 
                  : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <item.icon className={`w-4 h-4 shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`} />
                {isSidebarOpen && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800 shrink-0 flex flex-col gap-4">
          {currentUserRole !== 'user' && (
            <button onClick={() => setActiveTab('settings')} title={!isSidebarOpen ? "Settings" : undefined} className={`flex items-center text-xs font-medium uppercase tracking-widest w-full ${isSidebarOpen ? '' : 'justify-center'} ${activeTab === 'settings' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
              <Settings className={`w-4 h-4 shrink-0 ${isSidebarOpen ? 'mr-2' : ''}`} /> {isSidebarOpen && "Settings"}
            </button>
          )}
          <button onClick={() => { 
            setIsAuthenticated(false); 
            setCurrentUserRole(null); 
            setCurrentUsername(''); 
            setActiveTab('dashboard'); 
            localStorage.removeItem('superai_auth');
            localStorage.removeItem('superai_role');
            localStorage.removeItem('superai_username');
          }} title={!isSidebarOpen ? "Logout" : undefined} className={`flex items-center text-xs font-medium text-red-500 hover:text-red-400 uppercase tracking-widest w-full ${isSidebarOpen ? '' : 'justify-center'}`}>
            <ArrowLeft className={`w-4 h-4 shrink-0 ${isSidebarOpen ? 'mr-2' : ''}`} /> {isSidebarOpen && "Logout"}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} title={!isSidebarOpen ? "Expand" : undefined} className={`flex items-center text-xs font-medium text-slate-500 hover:text-slate-300 uppercase tracking-widest w-full ${isSidebarOpen ? '' : 'justify-center'}`}>
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4 shrink-0 mr-2" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
            {isSidebarOpen && "Collapse"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 relative z-40">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              className="md:hidden p-1 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-white uppercase tracking-widest">{activeTab}</h1>
            <div className="hidden md:block h-4 w-[1px] bg-slate-700"></div>
            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-2.5 py-0.5 rounded-full border border-slate-700">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-[9px] font-mono text-emerald-400 uppercase">System Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="w-7 h-7 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-xs font-mono text-cyan-400">
               AI
             </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Overlay background */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Sidebar content */}
            <aside className="w-64 relative z-50 bg-slate-900 border-r border-slate-800 h-full flex flex-col shadow-2xl">
              <div className="h-12 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-slate-950 rounded-full" />
                  </div>
                  <div className="flex flex-col ml-2 overflow-hidden whitespace-nowrap">
                    <span className="font-bold text-white tracking-tight text-lg leading-tight">SuperAI</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-20 no-scrollbar">
                <div className="px-4 mb-4">
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2">Core</div>
                   {[
                     { id: 'models', label: 'Models', icon: Cpu },
                     { id: 'datasets', label: 'Datasets', icon: Database },
                     { id: 'marketplace', label: 'Marketplace', icon: Store },
                     { id: 'playground', label: 'Playground', icon: Terminal },
                   ].map(nav => (
                     <button
                       key={nav.id}
                       onClick={() => { setActiveTab(nav.id); setIsMobileMenuOpen(false); setSelectedModel(null); setSelectedDataset(null); }}
                       className={`w-full flex items-center h-10 px-3 rounded-lg mb-1 transition-all ${
                         activeTab === nav.id ? 'bg-cyan-900/30 text-cyan-400 font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                       }`}
                     >
                       <nav.icon className={`w-5 h-5 ${activeTab === nav.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                       <span className="ml-3 text-sm">{nav.label}</span>
                     </button>
                   ))}
                </div>

                <div className="px-4 mb-4">
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2">System</div>
                   {[
                     { id: 'git', label: 'Version Control', icon: GitBranch },
                     { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
                     { id: 'settings', label: 'Settings', icon: Settings },
                   ].map(nav => (
                     <button
                       key={nav.id}
                       onClick={() => { setActiveTab(nav.id); setIsMobileMenuOpen(false); }}
                       className={`w-full flex items-center h-10 px-3 rounded-lg mb-1 transition-all ${
                         activeTab === nav.id ? 'bg-cyan-900/30 text-cyan-400 font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                       }`}
                     >
                       <nav.icon className={`w-5 h-5 ${activeTab === nav.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                       <span className="ml-3 text-sm">{nav.label}</span>
                     </button>
                   ))}
                </div>
              </div>
              <div className="mt-auto px-4 pb-4">
                <button 
                  onClick={() => {
                    localStorage.removeItem('superai_auth');
                    localStorage.removeItem('superai_role');
                    localStorage.removeItem('superai_username');
                    setIsAuthenticated(false);
                    setCurrentUserRole(null);
                    setCurrentUsername('');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center h-10 px-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                >
                  <StopCircle className="w-5 h-5" />
                  <span className="ml-3 text-sm">Disconnect</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col">
          {activeTab === 'models' && !selectedModel && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">Model Explorer</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Manage and orchestrate active models.</p>
                </div>
                <button 
                  onClick={() => setIsCreating(!isCreating)}
                  className="inline-flex items-center bg-cyan-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-cyan-500 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Initialize Model
                </button>
              </div>

              {isCreating && (
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                      <Layers className="w-4 h-4 mr-2 text-cyan-400" />
                      Configure Node
                    </h3>
                    <a href="#" className="flex items-center text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase font-mono">
                       <HelpCircle className="w-3 h-3 mr-1" />
                       Documentation
                    </a>
                  </div>
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Model Name</label>
                      <input 
                        type="text" 
                        required
                        value={newModel.name}
                        onChange={e => setNewModel({...newModel, name: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="e.g., node_alpha_1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Architecture</label>
                        <select 
                          value={newModel.type}
                          onChange={e => setNewModel({...newModel, type: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                        >
                          <option>Language</option>
                          <option>Vision</option>
                          <option>Audio</option>
                          <option>Tabular</option>
                          <option>GenVideo</option>
                          <option>Gaussian</option>
                          <option>Glypheral</option>
                          <option>MetaHuman</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Training Set</label>
                        <select 
                          value={newModel.dataset}
                          onChange={e => setNewModel({...newModel, dataset: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="">Select source...</option>
                          <option>ds_professional_coding (Code)</option>
                          <option>ds_support_log (Language)</option>
                          <option>ds_vision_v2 (Vision)</option>
                          <option>ds_audio_clips (Audio)</option>
                          <option>ds_sales_q1 (Tabular)</option>
                          <option>ds_video_scenes (GenVideo)</option>
                          <option>ds_gaussian_clouds (Gaussian)</option>
                          <option>ds_glyph_patterns (Glypheral)</option>
                          <option>ds_metahuman_scans (MetaHuman)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                      <button 
                        type="button" 
                        onClick={() => setIsCreating(false)}
                        className="px-3 py-1.5 text-xs text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-3 py-1.5 text-xs font-bold bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors"
                      >
                        Execute
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3">
                {models.map(model => (
                  <div key={model.id} className="bg-slate-900 border border-slate-800 rounded p-4 flex items-center justify-between hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                        <Box className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-slate-200">{model.name}</h4>
                        <div className="flex items-center text-[10px] font-mono text-slate-500 mt-1 gap-3">
                          <span className="flex items-center"><Layers className="w-3 h-3 mr-1" /> {model.type}</span>
                          <span>|</span>
                          {(() => {
                             const mData = modelsData[model.id];
                             if (mData && mData.length > 0) {
                                const lastData = mData[mData.length - 1];
                                return (
                                   <>
                                      <span>ACC: {lastData.accuracy.toFixed(1)}%</span>
                                      <span>|</span>
                                      <span>LOSS: {lastData.loss.toFixed(3)}</span>
                                   </>
                                );
                             } else {
                                return <span>ACC: {model.accuracy}</span>;
                             }
                          })()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {model.status === 'Deployed' ? (
                          <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-[9px] font-mono text-emerald-400 uppercase">Deployed</span>
                          </div>
                        ) : model.status === 'Training' ? (
                          <div className="flex items-center gap-1.5 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                            <div className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                            </div>
                            <span className="text-[9px] font-mono text-cyan-400 uppercase">Training</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                            <span className="text-[9px] font-mono text-slate-400 uppercase">{model.status}</span>
                          </div>
                        )}
                      {model.status === 'Deployed' && (
                        <button onClick={() => setShowMarketplaceModal(model.id)} className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 hover:bg-emerald-900/30 px-2 py-1.5 rounded transition">
                          <Store className="w-3 h-3 inline-block mr-1" /> Publish
                        </button>
                      )}
                      
                      <button onClick={() => { setIsViewingVersions(true); setSelectedModel(model.id); }} className="text-slate-500 hover:text-slate-300 transition-colors mr-2">
                        <History className="w-4 h-4" />
                      </button>
                      <button className="text-slate-500 hover:text-slate-300 transition-colors mr-2">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedModel(model.id); setIsViewingVersions(false); }} className="flex items-center text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded transition-colors mr-2">
                        <Play className="w-3 h-3 mr-1 text-cyan-400" /> Details
                      </button>
                      <button onClick={() => { setPlaygroundSelectedModel(model.id); setPlaygroundMessages([]); setActiveTab('playground'); }} className="flex items-center text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 border border-cyan-500 px-3 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        <MessageSquare className="w-3 h-3 mr-1" /> Chat
                      </button>
                    </div>
                  </div>
                ))}
                {models.length === 0 && (
                   <div className="text-center py-10 border border-dashed border-slate-700 rounded bg-slate-900/50">
                      <Box className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                      <h3 className="text-xs font-semibold text-slate-300">No active models</h3>
                      <p className="mt-1 text-[10px] font-mono text-slate-500">Initialize a new node to begin.</p>
                      <button onClick={() => setIsCreating(true)} className="mt-4 inline-flex items-center bg-cyan-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors">
                        <Plus className="w-3 h-3 mr-1" /> Initialize
                      </button>
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'models' && selectedModel && currentModel && !isViewingVersions && (
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setSelectedModel(null)} className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO WORKBENCH
                </button>
                <div className="flex gap-2">
                  <div className="relative group">
                    <select className="appearance-none bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-white uppercase font-bold pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer">
                      <option value="" disabled selected hidden>Export</option>
                      <option value="onnx">Export to ONNX</option>
                      <option value="tflite">Export to TF Lite</option>
                      <option value="coreml">Export to CoreML</option>
                      <option value="pt">Export to PyTorch</option>
                    </select>
                    <Download className="w-3 h-3 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <button onClick={() => setIsViewingVersions(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-white flex items-center">
                    <History className="w-3 h-3 mr-1" /> VERSIONS
                  </button>
                  <button onClick={() => setPausedModels(prev => ({...prev, [currentModel.id]: !prev[currentModel.id]}))} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-white uppercase font-bold flex items-center">
                    {pausedModels[currentModel.id] ? <Play className="w-3 h-3 mr-1 text-cyan-400" /> : <PauseCircle className="w-3 h-3 mr-1 text-amber-400" />} 
                    {pausedModels[currentModel.id] ? 'Resume' : 'Pause'}
                  </button>
                  <button onClick={() => setModels(models.map(m => m.id === currentModel.id ? {...m, status: 'Terminated'} : m))} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 text-red-200 border border-red-800 rounded text-xs font-bold uppercase flex items-center">
                    <StopCircle className="w-3 h-3 mr-1" /> Terminate
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{currentModel.name}</h2>
                      <span className="text-[10px] text-cyan-400 font-mono mt-1 block">EPOCH {trainingData.length > 0 ? trainingData[trainingData.length - 1].epoch : 0} / 100</span>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trainingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="epoch" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#10b981" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" fontSize={10} tickLine={false} axisLine={false} domain={[0, 1]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }} />
                        <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                        <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Live Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-400">Accuracy</span>
                          <span className="text-white font-mono">{trainingData.length > 0 ? trainingData[trainingData.length-1].accuracy.toFixed(1) : 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${trainingData.length > 0 ? trainingData[trainingData.length-1].accuracy : 0}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-400">Loss</span>
                          <span className="text-white font-mono">{trainingData.length > 0 ? trainingData[trainingData.length-1].loss.toFixed(4) : 0}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300" style={{ width: `${(trainingData.length > 0 ? trainingData[trainingData.length-1].loss : 0)*100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex-1 flex flex-col">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Console Output</h3>
                    <div className="flex-1 bg-slate-950/50 rounded border border-slate-800/50 p-3 overflow-y-auto">
                      <div className="text-[10px] font-mono space-y-1">
                        <p className="text-slate-400"><span className="text-slate-600">[sys]</span> Initialization started...</p>
                        <p className="text-slate-400"><span className="text-slate-600">[sys]</span> Loading weights: OK</p>
                        <p className="text-emerald-400"><span className="text-slate-600">[sys]</span> Training loop active.</p>
                        {trainingData.slice().reverse().slice(0, 8).map((d) => (
                           <p key={d.epoch} className="text-slate-400 opacity-80"><span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> Epoch {d.epoch}: loss {d.loss.toFixed(4)} - acc {d.accuracy.toFixed(2)}%</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'models' && selectedModel && currentModel && isViewingVersions && (
            <div className="flex flex-col flex-1 space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => setIsViewingVersions(false)} className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO VISUALIZER
                </button>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                 <h2 className="text-lg font-semibold text-white mb-1">{currentModel.name} - Version History</h2>
                 <p className="text-xs text-slate-400 font-mono mb-6">Manage model snapshots and rollback to previous states.</p>
                 
                 <div className="space-y-3">
                   {[
                     { v: 'v1.2.0', date: '2 hours ago', status: 'Deployed', desc: 'Added gradient clipping, improved convergence.', metrics: 'Acc: 94.2% | Loss: 0.021' },
                     { v: 'v1.1.5', date: '3 days ago', status: 'Archived', desc: 'Tuned hyperparameters, larger batch size.', metrics: 'Acc: 91.5% | Loss: 0.054' },
                     { v: 'v1.0.0', date: '1 week ago', status: 'Archived', desc: 'Initial baseline model.', metrics: 'Acc: 88.0% | Loss: 0.103' },
                   ].map((ver, i) => (
                     <div key={i} className={`flex flex-col p-4 rounded border ${i === 0 ? 'bg-slate-800/80 border-cyan-500/50' : 'bg-slate-900 border-slate-800'} hover:border-slate-700 transition-colors`}>
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-white">{ver.v}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{ver.date}</span>
                              {i === 0 && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono tracking-widest">{ver.status}</span>}
                           </div>
                           <div className="flex gap-2">
                              {i !== 0 && (
                                <button className="text-[10px] font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3 py-1 rounded uppercase flex items-center">
                                  <RefreshCw className="w-3 h-3 mr-1" /> Revert to this version
                                </button>
                              )}
                              {i === 0 && (
                                <button className="text-[10px] font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3 py-1 rounded uppercase flex items-center">
                                  <CheckCircle2 className="w-3 h-3 mr-1 text-cyan-400" /> Active Version
                                </button>
                              )}
                           </div>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{ver.desc}</p>
                        <div className="text-[10px] font-mono text-cyan-500/80 uppercase">{ver.metrics}</div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'datasets' && !selectedDataset && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">Dataset Management</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Upload and organize CSV, JSON, or Image data securely.</p>
                </div>
                <a href="#" className="flex items-center text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase font-mono">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  Documentation
                </a>
              </div>

              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                   <UploadCloud className="w-8 h-8" />
                 </div>
                 <h3 className="text-white font-bold mb-2">Drag & Drop Files</h3>
                 <p className="text-slate-500 text-xs max-w-md mb-6">Supported formats: CSV, JSON, PNG, JPG, ZIP. Maximum file size per batch is 4GB.</p>
                 <button className="px-5 py-2 bg-slate-800 border border-slate-700 rounded text-xs font-bold text-white hover:bg-slate-700 transition">
                   Browse Files
                 </button>
              </div>

              <div className="flex items-start gap-3 bg-amber-900/10 border border-amber-900/30 p-4 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-500 mb-1">Data Privacy & Storage Guidelines</h4>
                  <p className="text-[10px] text-amber-500/80 leading-relaxed font-mono">
                    All uploaded datasets are encrypted at rest (AES-256) and in transit (TLS 1.3). PII identification is enabled by default. SuperAI does not train foundational models on your proprietary datasets without explicit organizational policy consent.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
                 <table className="w-full text-left text-xs whitespace-nowrap">
                   <thead className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest bg-slate-900/50">
                     <tr>
                       <th className="px-4 py-3 font-medium">Dataset Name</th>
                       <th className="px-4 py-3 font-medium">Format</th>
                       <th className="px-4 py-3 font-medium">Size</th>
                       <th className="px-4 py-3 font-medium">Last Modified</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800 text-slate-300">
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_professional_coding')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_professional_coding</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-fuchsia-400">JSONL</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">42.1 GB</td>
                       <td className="px-4 py-3 text-slate-500">Just now</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_sales_q1')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_sales_q1</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400">CSV</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">24.5 MB</td>
                       <td className="px-4 py-3 text-slate-500">2 days ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_support_log')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_support_log</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">JSON</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">1.2 GB</td>
                       <td className="px-4 py-3 text-slate-500">1 week ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_vision_v2')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_vision_v2</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-indigo-400">TFRecord</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">84.5 GB</td>
                       <td className="px-4 py-3 text-slate-500">3 days ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_audio_clips')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_audio_clips</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-blue-400">WAV</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">12.8 GB</td>
                       <td className="px-4 py-3 text-slate-500">2 weeks ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_video_scenes')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_video_scenes</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-pink-400">MP4</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">142.1 GB</td>
                       <td className="px-4 py-3 text-slate-500">1 month ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_gaussian_clouds')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_gaussian_clouds</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-purple-400">PLY</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">210.5 GB</td>
                       <td className="px-4 py-3 text-slate-500">4 days ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_glyph_patterns')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_glyph_patterns</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-yellow-400">BIN</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">1.1 MB</td>
                       <td className="px-4 py-3 text-slate-500">6 hours ago</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelectedDataset('ds_metahuman_scans')}>
                       <td className="px-4 py-3 font-medium flex items-center"><Database className="w-4 h-4 mr-2 text-slate-500"/> ds_metahuman_scans</td>
                       <td className="px-4 py-3"><span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-orange-400">OBJ</span></td>
                       <td className="px-4 py-3 font-mono text-slate-500">312.4 GB</td>
                       <td className="px-4 py-3 text-slate-500">1 day ago</td>
                     </tr>
                   </tbody>
                 </table>
              </div>
            </div>
          )}

          {activeTab === 'datasets' && selectedDataset && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => setSelectedDataset(null)} className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO DATASETS
                </button>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">{selectedDataset}</div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Preprocessing Tools */}
                 <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <h2 className="text-sm font-bold text-slate-200 mb-1">Advanced Preprocessing Pipeline</h2>
                    <p className="text-xs text-slate-400 mb-6">Configure data imputation, scaling, and encoding before training.</p>
                    
                    <div className="space-y-6">
                       <div className="bg-slate-950/50 border border-slate-800 rounded p-4">
                          <label className="flex items-center justify-between font-bold text-xs text-slate-300 uppercase tracking-widest mb-3">
                             <span>Data Imputation</span>
                             <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] focus:outline-none">
                               <option>Mean Imputation</option>
                               <option>Median Imputation</option>
                               <option>Mode Imputation (Categorical)</option>
                               <option>Drop Missing Data</option>
                             </select>
                          </label>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Handles missing values in continuous variables by substituting them with the selected statistical metric across the dataset.</p>
                       </div>
                       
                       <div className="bg-slate-950/50 border border-slate-800 rounded p-4">
                          <label className="flex items-center justify-between font-bold text-xs text-slate-300 uppercase tracking-widest mb-3">
                             <span>Feature Scaling</span>
                             <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] focus:outline-none">
                               <option>Standard Scaler (Z-Score)</option>
                               <option>Min-Max Scaler</option>
                               <option>Robust Scaler</option>
                             </select>
                          </label>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Normalizes feature ranges to accelerate gradient descent convergence and prevent scale-based weight bias.</p>
                       </div>

                       <div className="bg-slate-950/50 border border-slate-800 rounded p-4">
                          <label className="flex items-center justify-between font-bold text-xs text-slate-300 uppercase tracking-widest mb-3">
                             <span>One-Hot Encoding</span>
                             <input type="checkbox" defaultChecked className="w-4 h-4 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500 text-cyan-500 bg-transparent" />
                          </label>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Automatically detects string/categorical columns (rank &lt; 50) and splits them into binary sparse matrix columns.</p>
                       </div>

                       <div className="pt-4 flex justify-end">
                         <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded uppercase tracking-widest transition-colors flex items-center">
                           <RefreshCw className="w-3 h-3 mr-2" /> Apply Pipeline
                         </button>
                       </div>
                    </div>
                 </div>
                 
                 {/* Dataset Stats */}
                 <div className="flex flex-col gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                       <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Dataset Profile</h3>
                       <div className="space-y-3">
                         <div className="flex justify-between items-center text-xs">
                           <span className="text-slate-400">Total Rows</span>
                           <span className="text-white font-mono">1.42M</span>
                         </div>
                         <div className="flex justify-between items-center text-xs">
                           <span className="text-slate-400">Total Columns</span>
                           <span className="text-white font-mono">24</span>
                         </div>
                         <div className="flex justify-between items-center text-xs">
                           <span className="text-slate-400">Missing Values</span>
                           <span className="text-amber-400 font-mono">1.2%</span>
                         </div>
                         <div className="flex justify-between items-center text-xs">
                           <span className="text-slate-400">Memory Approx.</span>
                           <span className="text-white font-mono">24.5 MB</span>
                         </div>
                       </div>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex-1">
                       <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Processing Logs</h3>
                       <div className="text-[10px] font-mono space-y-2 text-slate-400">
                          <p>[13:42] Scan complete. 24 columns identified.</p>
                          <p>[13:42] 3 string columns found. One-Hot eligible.</p>
                          <p>[13:45] Missing values detected in &apos;price&apos; feature.</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">Pre-Trained Architectures</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Start from foundational templates for common ML tasks.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { name: 'Gaussian Splatting', icon: Box, tag: '3D Vision', color: 'text-purple-400', desc: 'Generate 3D scenes from 2D images via 3D Gaussian splatting representation.' },
                   { name: 'Glypheral Quantization', icon: Box, tag: 'Glypheral', color: 'text-yellow-400', desc: 'Specialize in data quantization glyphs for ultra-compressed visual representations.' },
                   { name: 'MetaHuman Rendering', icon: Layers, tag: 'Avatar', color: 'text-orange-400', desc: 'High-fidelity source for rendering highly realistic MetaHuman avatars.' },
                   { name: 'Image Classification', icon: Layers, tag: 'Vision', color: 'text-indigo-400', desc: 'Categorize images into discrete labels. Best for quality control, medical imaging, or content moderation.' },
                   { name: 'Object Detection', icon: Box, tag: 'Vision', color: 'text-cyan-400', desc: 'Identify and locate multiple objects within an image using bounding boxes. Ideal for robotics or tracking.' },
                   { name: 'Sentiment Analysis', icon: Activity, tag: 'Language', color: 'text-emerald-400', desc: 'Determine the emotional tone of text inputs. Perfect for social media monitoring or support routing.' },
                   { name: 'Text Summarization', icon: LayoutTemplate, tag: 'Language', color: 'text-amber-400', desc: 'Condense long-form documents into concise summaries while preserving key information.' },
                   { name: 'GenVideo', icon: Play, tag: 'Generative', color: 'text-pink-400', desc: 'Generate video from text. Turn blog posts, scripts, or product descriptions into short, compelling video clips.' },
                 ].map((tmpl, i) => (
                   <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col hover:border-slate-600 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                         <tmpl.icon className={`w-5 h-5 ${tmpl.color}`} />
                       </div>
                       <div>
                         <h4 className="font-bold text-white text-sm">{tmpl.name}</h4>
                         <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">{tmpl.tag}</span>
                       </div>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed flex-1">{tmpl.desc}</p>
                     <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                       <button className="text-xs font-bold text-cyan-500 group-hover:text-cyan-400">USE TEMPLATE &rarr;</button>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              {selectedMarketplaceModel ? (
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <button onClick={() => setSelectedMarketplaceModel(null)} className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase font-mono">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
                    </button>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-cyan-500 font-mono bg-cyan-900/10 px-2 py-1 rounded uppercase border border-cyan-500/20">{selectedMarketplaceModel.type}</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedMarketplaceModel.name}</h2>
                    <p className="text-sm font-mono text-slate-400">By {selectedMarketplaceModel.author}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6">
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-white">{selectedMarketplaceModel.rating}</span>
                        <span className="text-slate-500">({selectedMarketplaceModel.reviews.length} reviews)</span>
                     </div>
                     <div className="w-[1px] h-4 bg-slate-700"></div>
                     <div className="font-bold text-emerald-400">${selectedMarketplaceModel.price}</div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest bg-emerald-950/20 border border-emerald-900/30 px-2 py-1 rounded">+ 25% Platform & Developer Tax</div>
                  </div>
                  <div className="mb-8">
                     <h3 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-widest font-mono">About this model</h3>
                     <p className="text-sm text-slate-300 leading-relaxed p-4 bg-slate-950/50 rounded-lg border border-slate-800/50">
                        {selectedMarketplaceModel.description}
                     </p>
                  </div>
                  
                  <div className="border-t border-slate-800 pt-6 mt-2 mb-6">
                     <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest font-mono">User Reviews</h3>
                     {selectedMarketplaceModel.reviews.length > 0 ? (
                        <div className="space-y-4">
                           {selectedMarketplaceModel.reviews.map((r: any, idx: number) => (
                              <div key={idx} className="bg-slate-950/50 p-4 rounded border border-slate-800 text-sm">
                                 <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-cyan-400">@{r.user}</span>
                                    <div className="flex items-center gap-0.5">
                                       {[...Array(5)].map((_, i) => (
                                          <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-yellow-500 fill-current' : 'text-slate-700'}`} />
                                       ))}
                                    </div>
                                 </div>
                                 <p className="text-slate-300">{r.comment}</p>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p className="text-xs text-slate-500 italic">No reviews yet.</p>
                     )}
                  </div>
                  
                  <div className="flex justify-end pt-4 mt-auto border-t border-slate-800">
                     <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-8 rounded uppercase tracking-widest text-sm transition-colors border border-emerald-500">
                        Purchase & Install
                     </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row justify-between md:items-center bg-slate-900 border border-slate-800 rounded-lg p-4 gap-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                         <Store className="w-5 h-5 text-cyan-400" /> Model Marketplace
                      </h2>
                      <p className="text-xs text-slate-500 font-mono mt-1">Discover, purchase, or sell trained models with the community.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                       <select 
                         value={marketFilterType}
                         onChange={(e) => setMarketFilterType(e.target.value)}
                         className="bg-slate-950 border border-slate-800 text-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                       >
                         <option value="All">All Types</option>
                         <option value="Language">Language</option>
                         <option value="Vision">Vision</option>
                         <option value="Audio">Audio</option>
                         <option value="Multi-modal">Multi-modal</option>
                       </select>
                       
                       <select 
                         value={marketSortBy}
                         onChange={(e) => setMarketSortBy(e.target.value)}
                         className="bg-slate-950 border border-slate-800 text-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                       >
                         <option value="rating">Top Rated</option>
                         <option value="popularity">Most Popular</option>
                         <option value="price_asc">Price: Low to High</option>
                         <option value="price_desc">Price: High to Low</option>
                       </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredAndSortedMarketplaceModels.map((m) => (
                        <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col hover:border-slate-700 transition-colors cursor-pointer group shadow-sm" onClick={() => setSelectedMarketplaceModel(m)}>
                           <div className="flex justify-between items-start mb-4">
                              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{m.name}</h3>
                              <span className="text-[10px] font-mono font-bold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800 uppercase">{m.type}</span>
                           </div>
                           <p className="text-xs text-slate-400 mb-6 bg-slate-950/50 p-2 rounded line-clamp-3 leading-relaxed flex-1">{m.description}</p>
                           <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                              <div className="flex items-center gap-1.5 text-xs">
                                 <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                 <span className="font-bold text-slate-200">{m.rating}</span>
                                 <span className="text-slate-600 font-mono">({m.reviews.length})</span>
                              </div>
                              <div className="text-sm font-bold text-emerald-400">${m.price}</div>
                           </div>
                        </div>
                     ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full h-full pb-4">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4 shrink-0">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2"><Play className="w-4 h-4 text-cyan-400" /> Model Playground</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Test and interact with your deployed models.</p>
                </div>
                <div>
                  <select 
                    value={playgroundSelectedModel || ''}
                    onChange={(e) => {
                      setPlaygroundSelectedModel(Number(e.target.value));
                      setPlaygroundMessages([]);
                    }}
                    className="bg-slate-800 border border-slate-700 text-white rounded text-xs px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-bold"
                  >
                    {models.map(m => (
                      <option key={m.id} value={m.id}>{m.name} {m.status !== 'Deployed' ? '(Offline)' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 min-h-[400px] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
                {playgroundSelectedModel ? (
                  <>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {playgroundMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                          <MessageSquare className="w-8 h-8 opacity-50" />
                          <p className="text-sm">Start a conversation with {models.find(m => m.id === playgroundSelectedModel)?.name}</p>
                        </div>
                      ) : (
                        playgroundMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 text-sm flex gap-3 ${
                              msg.role === 'user' 
                                ? 'bg-cyan-600 text-white rounded-br-none' 
                                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                            }`}>
                              {msg.role === 'model' && (
                                <div className="w-6 h-6 rounded bg-slate-900 shrink-0 flex items-center justify-center">
                                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                              )}
                              <div className="leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="p-4 border-t border-slate-800 bg-slate-950/50 shrink-0">
                      <form onSubmit={handlePlaygroundSubmit} className="relative">
                        <input
                          type="text"
                          value={playgroundInput}
                          onChange={(e) => setPlaygroundInput(e.target.value)}
                          placeholder="Type your message or prompt..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-full pl-4 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                        <button 
                          type="submit" 
                          disabled={!playgroundInput.trim()}
                          className="absolute right-2 top-2 p-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-full transition-colors flex items-center justify-center aspect-square"
                        >
                          <Play className="w-4 h-4 ml-0.5" />
                        </button>
                      </form>
                      {models.find(m => m.id === playgroundSelectedModel)?.status !== 'Deployed' && (
                        <p className="text-center text-[10px] text-amber-500 mt-2 font-mono uppercase tracking-widest">Model is currently in training phase. Responses may be degraded.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <p className="text-sm">Select a model to begin.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">Team Collaboration</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Manage role-based access and collaborate in real-time.</p>
                </div>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold border border-slate-700 transition">
                  Invite Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User List */}
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
                   <table className="w-full text-left text-xs whitespace-nowrap">
                     <thead className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest bg-slate-900/50">
                       <tr>
                         <th className="px-4 py-3 font-medium">Team Member</th>
                         <th className="px-4 py-3 font-medium">Role</th>
                         <th className="px-4 py-3 font-medium">Status</th>
                         <th className="px-4 py-3 font-medium">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800 text-slate-300">
                       <tr className="hover:bg-slate-800/30 transition-colors">
                         <td className="px-4 py-3 font-medium flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">AL</div>
                           <div className="flex flex-col"><span>Alice L.</span><span className="text-[9px] text-slate-500 font-mono">alice@superai.co</span></div>
                         </td>
                         <td className="px-4 py-3">
                           <select className="bg-slate-800 border border-slate-700 rounded text-xs py-1 px-2 text-white outline-none">
                             <option>Admin</option>
                             <option>Editor</option>
                             <option>Viewer</option>
                           </select>
                         </td>
                         <td className="px-4 py-3">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Online</div>
                         </td>
                         <td className="px-4 py-3"><button className="text-slate-500 hover:text-white"><Settings className="w-4 h-4"/></button></td>
                       </tr>
                       <tr className="hover:bg-slate-800/30 transition-colors">
                         <td className="px-4 py-3 font-medium flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">BK</div>
                           <div className="flex flex-col"><span>Bob K.</span><span className="text-[9px] text-slate-500 font-mono">bob@superai.co</span></div>
                         </td>
                         <td className="px-4 py-3">
                           <select className="bg-slate-800 border border-slate-700 rounded text-xs py-1 px-2 text-white outline-none">
                             <option>Editor</option>
                             <option>Admin</option>
                             <option>Viewer</option>
                           </select>
                         </td>
                         <td className="px-4 py-3">
                           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-600"></div> Offline</div>
                         </td>
                         <td className="px-4 py-3"><button className="text-slate-500 hover:text-white"><Settings className="w-4 h-4"/></button></td>
                       </tr>
                     </tbody>
                   </table>
                </div>

                {/* Team Chat / Activity */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Recent Activity & Chat</h3>
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                     <div className="flex gap-2 text-xs">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[9px] shrink-0">AL</div>
                        <div>
                          <p className="font-bold text-slate-300">Alice L. <span className="font-normal text-[9px] font-mono text-slate-500">10m ago</span></p>
                          <p className="text-slate-400 mt-0.5">I&apos;ve kicked off training for v1.2.0 on the new sales dataset.</p>
                        </div>
                     </div>
                     <div className="flex gap-2 text-xs">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[9px] shrink-0">BK</div>
                        <div>
                          <p className="font-bold text-slate-300">Bob K. <span className="font-normal text-[9px] font-mono text-slate-500">2h ago</span></p>
                          <p className="text-slate-400 mt-0.5">Applied median imputation on ds_support_log missing fields.</p>
                        </div>
                     </div>
                  </div>
                  <div className="relative mt-auto">
                     <input type="text" placeholder="Type a message..." className="w-full bg-slate-950 border border-slate-700 rounded pl-3 pr-10 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500" />
                     <button className="absolute right-2 top-2 text-slate-500 hover:text-cyan-400"><Play className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full pb-8">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2"><GitBranch className="w-5 h-5 text-emerald-400"/> Git Integration</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Version control your complete model definitions and hyperparameter configs.</p>
                </div>
                <div className="flex gap-2">
                   <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-bold text-white flex items-center">
                     <StopCircle className="w-3 h-3 mr-2" /> Disconnect
                   </button>
                </div>
              </div>

              {/* Sub Navigation */}
              <div className="flex border-b border-slate-800">
                {[
                  { id: 'overview', label: 'Overview & Diff', icon: GitCommit },
                  { id: 'branches', label: 'Branches & Merging', icon: GitBranch },
                  { id: 'remotes', label: 'Remotes', icon: Server },
                  { id: 'advanced', label: 'Hooks & Ignore', icon: Settings },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setGitSubTab(t.id)}
                    className={`flex items-center px-4 py-3 border-b-2 font-medium text-xs transition-colors ${
                      gitSubTab === t.id
                        ? 'border-emerald-400 text-emerald-400 bg-slate-900/50'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <t.icon className="w-4 h-4 mr-2" />
                    {t.label}
                  </button>
                ))}
              </div>

              {gitSubTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Connection Status */}
                   <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Repository Status</h3>
                      <div className="flex items-center gap-3 mb-6 bg-slate-950/50 p-4 border border-slate-800 rounded">
                        <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">github.com/superai-org/vision-models</h4>
                          <p className="text-[10px] text-slate-500 font-mono">Branch: <span className="text-cyan-400">{gitBranches.find(b => b.current)?.name}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                         <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs uppercase tracking-widest flex items-center justify-center transition-colors">
                           <UploadCloud className="w-4 h-4 mr-2" /> Push Configs
                         </button>
                         <button className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-2 rounded text-xs uppercase tracking-widest flex items-center justify-center transition-colors">
                           <Download className="w-4 h-4 mr-2" /> Pull Latest
                         </button>
                      </div>
                   </div>
  
                   {/* Commit Log */}
                   <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Commits</h3>
                        <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
                      </div>
                      <div className="space-y-4">
                         <div className="border-l-2 border-emerald-500 pl-3">
                           <p className="text-xs font-medium text-slate-300">Update optimizer config to AdamW</p>
                           <p className="text-[10px] font-mono text-slate-500 mt-1">b3a1f9e • 2 hours ago by Alice L.</p>
                         </div>
                         <div className="border-l-2 border-slate-700 pl-3">
                           <p className="text-xs font-medium text-slate-300">Revert &quot;Increase batch size&quot;</p>
                           <p className="text-[10px] font-mono text-slate-500 mt-1">8c72bd4 • 1 day ago by Bob K.</p>
                         </div>
                         <div className="border-l-2 border-slate-700 pl-3">
                           <p className="text-xs font-medium text-slate-300">Initial Vision-X-Alpha hyperparameters</p>
                           <p className="text-[10px] font-mono text-slate-500 mt-1">f19a002 • 3 days ago by System</p>
                         </div>
                      </div>
                   </div>
                   
                   {/* Diff Viewer */}
                   <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
                     <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Config Diff: config.yaml</h3>
                        <div className="flex gap-2">
                           <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">+2 additions</span>
                           <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded">-1 deletion</span>
                        </div>
                     </div>
                     <div className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed">
                        <div className="flex group hover:bg-slate-800/50"><div className="w-8 text-slate-600 text-right pr-4 select-none">12</div><div className="text-slate-400">training:</div></div>
                        <div className="flex group hover:bg-slate-800/50"><div className="w-8 text-slate-600 text-right pr-4 select-none">13</div><div className="text-slate-400">  batch_size: 64</div></div>
                        <div className="flex bg-red-900/20 group hover:bg-red-900/30"><div className="w-8 text-red-500 text-right pr-4 select-none">14</div><div className="text-red-300">-  optimizer: SGD</div></div>
                        <div className="flex bg-emerald-900/20 group hover:bg-emerald-900/30"><div className="w-8 text-emerald-500 text-right pr-4 select-none">14</div><div className="text-emerald-300">+  optimizer: AdamW</div></div>
                        <div className="flex bg-emerald-900/20 group hover:bg-emerald-900/30"><div className="w-8 text-emerald-500 text-right pr-4 select-none">15</div><div className="text-emerald-300">+  learning_rate: 0.001</div></div>
                        <div className="flex group hover:bg-slate-800/50"><div className="w-8 text-slate-600 text-right pr-4 select-none">16</div><div className="text-slate-400">  epochs: 100</div></div>
                     </div>
                   </div>
                </div>
              )}

              {gitSubTab === 'branches' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Branches</h3>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold flex items-center transition-colors">
                      <Plus className="w-3 h-3 mr-1" /> New Branch
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {gitBranches.map((branch, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <GitBranch className={`w-5 h-5 ${branch.current ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <div>
                            <p className="text-sm font-bold text-slate-200">
                              {branch.name}
                              {branch.current && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase">Current</span>}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono mt-1">Updated 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!branch.current && (
                            <button 
                              onClick={() => setGitBranches(gitBranches.map(b => ({ ...b, current: b.name === branch.name })))}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold transition-colors">
                                Checkout
                            </button>
                          )}
                          {!branch.current && (
                            <button className="px-3 py-1.5 bg-indigo-900/40 border border-indigo-500/30 hover:bg-indigo-900/60 text-indigo-300 rounded text-xs font-bold transition-colors flex items-center">
                              <GitMerge className="w-3 h-3 mr-1" /> Merge into main
                            </button>
                          )}
                          {!branch.current && (
                            <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded transition-colors">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gitSubTab === 'remotes' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Configured Remotes</h3>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold flex items-center transition-colors">
                      <Plus className="w-3 h-3 mr-1" /> Add Remote
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {gitRemotes.map((remote, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-indigo-400" />
                          <div>
                            <p className="text-sm font-bold text-slate-200">{remote.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-1">{remote.url}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-bold transition-colors">Edit</button>
                          <button className="px-3 py-1 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded text-xs font-bold transition-colors">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gitSubTab === 'advanced' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col space-y-4">
                     <div>
                       <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-slate-400" /> .gitignore</h3>
                       <p className="text-[10px] text-slate-500 mb-2">Specify files or directories that Git should ignore.</p>
                     </div>
                     <textarea 
                        value={gitignoreContent}
                        onChange={(e) => setGitignoreContent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-[11px] text-slate-300 h-64 focus:outline-none focus:border-emerald-500/50"
                        spellCheck={false}
                     />
                     <div className="flex justify-end">
                       <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-colors">
                         Save .gitignore
                       </button>
                     </div>
                   </div>

                   <div className="flex flex-col space-y-4">
                     <div className="flex justify-between items-start">
                       <div>
                         <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2"><Code className="w-3.5 h-3.5 text-slate-400" /> Git Hooks</h3>
                         <p className="text-[10px] text-slate-500 mb-2">Scripts to run automatically on specific Git events.</p>
                       </div>
                       <select className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded px-2 py-1 outline-none">
                         <option>pre-commit</option>
                         <option>pre-push</option>
                         <option>post-commit</option>
                       </select>
                     </div>
                     <textarea 
                        value={gitHooksContent}
                        onChange={(e) => setGitHooksContent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-[11px] text-amber-300/80 h-64 focus:outline-none focus:border-emerald-500/50"
                        spellCheck={false}
                     />
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <input type="checkbox" id="hookEnabled" defaultChecked className="rounded border-slate-700 bg-slate-900" />
                         <label htmlFor="hookEnabled" className="text-xs text-slate-400 cursor-pointer">Enable this hook</label>
                       </div>
                       <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-colors">
                         Save Hook
                       </button>
                     </div>
                   </div>
                 </div>
              )}

            </div>
          )}

          {activeTab === 'api' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full">
               <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">API Access & Keys</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Programmatically interact with your deployed models via HTTP endpoints.</p>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="flex items-center text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase font-mono">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Documentation
                  </a>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold transition">
                     Generate Key
                  </button>
                </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Endpoints */}
                 <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Active Endpoints</h3>
                   <div className="space-y-4">
                      <div className="bg-slate-950/50 border border-slate-800 rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="text-xs font-bold text-white">Customer Sentiment LLM</h4>
                           <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">Active</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                           <span className="bg-slate-800 text-cyan-400 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase">POST</span>
                           <code className="text-xs text-slate-400 font-mono flex-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded truncate">https://api.superai.co/v1/models/sentiment-llm/predict</code>
                           <button className="p-1.5 bg-slate-800 border border-slate-700 rounded text-slate-400 hover:text-white transition"><Copy className="w-3.5 h-3.5"/></button>
                        </div>
                        <div className="bg-slate-900 p-3 rounded font-mono text-[10px] text-slate-400 border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                          <p className="text-pink-400">curl <span className="text-slate-300">-X POST</span> https://api.superai.co/v1/models/sentiment-llm/predict \</p>
                          <p className="ml-4"><span className="text-slate-300">-H</span> &quot;Authorization: Bearer YOUR_API_KEY&quot; \</p>
                          <p className="ml-4"><span className="text-slate-300">-H</span> &quot;Content-Type: application/json&quot; \</p>
                          <p className="ml-4"><span className="text-slate-300">-d</span> &apos;&#123;&quot;instances&quot;: [&#123;&quot;text&quot;: &quot;I absolutely love this product!&quot;&#125;]&#125;&apos;</p>
                        </div>
                      </div>
                   </div>
                 </div>

                 {/* API Keys */}
                 <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Your Secret Keys</h3>
                   <div className="space-y-3">
                     <div className="bg-slate-950 border border-slate-800 p-3 rounded flex justify-between items-center group cursor-pointer hover:border-slate-700 transition">
                       <div className="flex items-center gap-3">
                         <Key className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                         <div>
                           <p className="text-xs font-bold text-slate-300">Production Key</p>
                           <p className="text-[10px] text-slate-500 font-mono">sk_live_...x9f2</p>
                         </div>
                       </div>
                       <button className="text-slate-500 hover:text-white"><Copy className="w-4 h-4" /></button>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 p-3 rounded flex justify-between items-center group cursor-pointer hover:border-slate-700 transition">
                       <div className="flex items-center gap-3">
                         <Key className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                         <div>
                           <p className="text-xs font-bold text-slate-300">Dev Workspace</p>
                           <p className="text-[10px] text-slate-500 font-mono">sk_test_...a4z1</p>
                         </div>
                       </div>
                       <button className="text-slate-500 hover:text-white"><Copy className="w-4 h-4" /></button>
                     </div>
                   </div>
                   <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                     Never share your API keys in public repositories or client-side code.
                   </div>
                 </div>

                 {/* Security & Limits */}
                 <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-amber-500" /> Security & Rate Limits</h3>
                   <div className="space-y-6">
                     <div>
                       <label className="flex items-center justify-between mb-2">
                         <span className="text-xs font-bold text-slate-300">IP Whitelisting</span>
                         <div className="w-8 h-4 bg-emerald-500/20 rounded-full flex items-center p-0.5 border border-emerald-500/30">
                           <div className="w-3 h-3 bg-emerald-400 rounded-full translate-x-4"></div>
                         </div>
                       </label>
                       <p className="text-[10px] text-slate-500 font-mono mt-1 mb-3">Restrict API key usage to specific IP addresses or CIDR ranges.</p>
                       <div className="flex gap-2">
                         <input type="text" placeholder="e.g., 192.168.1.1/32" className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono" />
                         <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded text-xs font-bold transition-colors">Add</button>
                       </div>
                       <div className="mt-3 flex flex-wrap gap-2">
                         <span className="inline-flex items-center gap-1 bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-400">
                           203.0.113.45 <button className="hover:text-rose-400">&times;</button>
                         </span>
                       </div>
                     </div>

                     <div className="pt-4 border-t border-slate-800">
                       <label className="flex items-center justify-between mb-2">
                         <span className="text-xs font-bold text-slate-300">Rate Limiting</span>
                         <span className="text-[10px] text-cyan-400 font-mono bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-800/50">Active</span>
                       </label>
                       <p className="text-[10px] text-slate-500 font-mono mt-1 mb-3">Prevent abuse by configuring maximum requests per minute (RPM).</p>
                       <div className="flex items-center gap-4">
                         <input type="range" min="10" max="1000" defaultValue="120" className="flex-1 accent-cyan-500" />
                         <span className="text-xs font-mono font-bold text-slate-200 bg-slate-950 px-2 py-1 border border-slate-800 rounded">120 RPM</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'dashboard' && currentUserRole === 'user' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full pb-8">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-400"/> My Dashboard</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Welcome back, {currentUsername}. Here is your personal overview.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-xs font-bold text-slate-400 uppercase">My Models</h3>
                  <p className="text-2xl font-bold text-slate-200 mt-2">0</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-xs font-bold text-slate-400 uppercase">My Datasets</h3>
                  <p className="text-2xl font-bold text-slate-200 mt-2">0</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                  <h3 className="text-xs font-bold text-slate-400 uppercase">Inference Tokens</h3>
                  <p className="text-2xl font-bold text-slate-200 mt-2">10k / 1M</p>
                </div>
              </div>

              {/* Resource Monitoring Widget */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-500" /> Active Hardware Utilization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">GPU Cluster</span>
                      <span className="text-[10px] font-mono text-cyan-400">72%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[72%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">System Memory</span>
                      <span className="text-[10px] font-mono text-purple-400">45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[45%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">CPU Usage</span>
                      <span className="text-[10px] font-mono text-emerald-400">28%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[28%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Detailed GPU Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2"><Cpu className="w-3 h-3 text-cyan-500" /> GPU 0: NVIDIA A100</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-800/50">68°C</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Core Utilization</span>
                            <span className="text-cyan-400 font-mono">72%</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[72%]"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Memory Allocation</span>
                            <span className="text-purple-400 font-mono">24GB / 40GB</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[60%]"></div></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col justify-center items-center h-full min-h-[140px]">
                      <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center mb-2 text-slate-500 hover:bg-slate-800 transition-colors cursor-pointer">
                        <Play className="w-4 h-4 ml-0.5" />
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">GPU 1 (Standby)</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'dashboard' && currentUserRole !== 'user' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-5xl mx-auto w-full pb-8">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-400"/> Operational Dashboard</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">System status and Google Workspace integrations.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Models", value: models.length.toString(), icon: Box, color: "text-indigo-400" },
                  { label: "Sync Tasks", value: "3 Pending", icon: CheckSquare, color: "text-emerald-400" },
                  { label: "New Forms", value: "12 Responses", icon: FileText, color: "text-purple-400" },
                  { label: "Avg Latency", value: "24ms", icon: Activity, color: "text-cyan-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-200">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-950 rounded flex items-center justify-center border border-slate-800">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Google Tasks & Keep */}
                 <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
                   <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                     <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> Google Tasks
                     </h3>
                   </div>
                   <div className="p-4 space-y-3">
                     {[
                       { task: 'Review new Vision dataset annotations', status: 'pending' },
                       { task: 'Deploy Sentiment LLM v1.2.0 to prod', status: 'pending' },
                       { task: 'Check billing limits for Firebase', status: 'done' },
                     ].map((t, i) => (
                       <div key={i} className="flex gap-3 items-start select-none">
                         <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${t.status === 'done' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-600 bg-slate-800'}`}>
                           {t.status === 'done' && <CheckCircle2 className="w-3 h-3" />}
                         </div>
                         <p className={`text-sm ${t.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{t.task}</p>
                       </div>
                     ))}
                   </div>
                   <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex justify-between items-center mt-auto">
                     <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <StickyNote className="w-3.5 h-3.5 text-amber-400" /> Google Keep Notes
                     </h3>
                   </div>
                   <div className="p-4">
                     <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded text-xs text-slate-400 italic">
                       "Hypothesis: Using the new glypheral patterns dataset might reduce quantization error by 4% on the main avatar renderer."
                     </div>
                   </div>
                 </div>

                 {/* Google Sheets, Docs, Forms & Picker */}
                 <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col space-y-px bg-slate-800">
                    <div className="bg-slate-900 p-4 flex gap-4 items-center">
                       <div className="w-10 h-10 bg-blue-900/20 border border-blue-800/50 rounded flex items-center justify-center shrink-0">
                         <FileText className="w-5 h-5 text-blue-400" />
                       </div>
                       <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-200">Model Eval Report Q2</h4>
                         <p className="text-[10px] text-slate-500 font-mono mt-1">Google Docs • Edited 2 hrs ago</p>
                       </div>
                       <button className="text-slate-500 hover:text-white"><ExternalLink className="w-4 h-4"/></button>
                    </div>
                    <div className="bg-slate-900 p-4 flex gap-4 items-center">
                       <div className="w-10 h-10 bg-emerald-900/20 border border-emerald-800/50 rounded flex items-center justify-center shrink-0">
                         <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                       </div>
                       <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-200">Customer Feedback Sync</h4>
                         <p className="text-[10px] text-slate-500 font-mono mt-1">Google Sheets • Syncing real-time</p>
                       </div>
                       <button className="text-slate-500 hover:text-white"><ExternalLink className="w-4 h-4"/></button>
                    </div>
                    <div className="bg-slate-900 p-4 flex gap-4 items-center">
                       <div className="w-10 h-10 bg-purple-900/20 border border-purple-800/50 rounded flex items-center justify-center shrink-0">
                         <ClipboardList className="w-5 h-5 text-purple-400" />
                       </div>
                       <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-200">Beta Tester Survey</h4>
                         <p className="text-[10px] text-slate-500 font-mono mt-1">Google Forms • 12 New Responses</p>
                       </div>
                       <button className="text-slate-500 hover:text-white"><ExternalLink className="w-4 h-4"/></button>
                    </div>
                    <div className="bg-slate-900 p-4 flex gap-4 items-center justify-center h-full">
                       <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold py-2 px-4 rounded w-full flex items-center justify-center transition-colors">
                         <FolderOpen className="w-4 h-4 mr-2 text-cyan-400" /> Import from Google Drive Picker
                       </button>
                    </div>
                 </div>
              </div>

              {/* Resource Monitoring Widget */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-500" /> Active Hardware Utilization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">GPU Cluster</span>
                      <span className="text-[10px] font-mono text-cyan-400">88%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[88%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">System Memory</span>
                      <span className="text-[10px] font-mono text-purple-400">62%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[62%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-300">CPU Usage</span>
                      <span className="text-[10px] font-mono text-emerald-400">45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[45%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Detailed GPU Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2"><Cpu className="w-3 h-3 text-cyan-500" /> GPU 0: NVIDIA A100</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-800/50">75°C</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Core Utilization</span>
                            <span className="text-cyan-400 font-mono">88%</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[88%]"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Memory Allocation</span>
                            <span className="text-purple-400 font-mono">35GB / 40GB</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[87%]"></div></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2"><Cpu className="w-3 h-3 text-cyan-500" /> GPU 1: NVIDIA A100</span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-800/50">82°C</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Core Utilization</span>
                            <span className="text-cyan-400 font-mono">94%</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[94%]"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                            <span className="text-slate-500">Memory Allocation</span>
                            <span className="text-purple-400 font-mono">38GB / 40GB</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[95%]"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex-1 flex flex-col space-y-6 max-w-4xl mx-auto w-full pb-8">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2"><Settings className="w-5 h-5 text-slate-400"/> Settings & Integrations</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Manage Workspace connections and Firebase configuration.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Firebase Config */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> Firebase Integration
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-950/20 border border-emerald-900/30 rounded">
                      <div>
                        <p className="text-sm font-bold text-emerald-400">Connected</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">Project ID: gen-lang-client-0157504950</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Region</label>
                      <input type="text" disabled value="us-west1" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Firestore Database ID</label>
                      <input type="text" disabled value="(default)" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-500 cursor-not-allowed" />
                    </div>
                    <button className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300 transition-colors">Disconnect Firebase</button>
                  </div>
                </div>

                {/* Workspace OAuth */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-400" /> Google Workspace
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Google Tasks', status: true, icon: CheckSquare, color: 'text-emerald-400' },
                      { name: 'Google Docs', status: true, icon: FileText, color: 'text-blue-400' },
                      { name: 'Google Forms', status: true, icon: ClipboardList, color: 'text-purple-400' },
                      { name: 'Google Keep', status: true, icon: StickyNote, color: 'text-amber-400' },
                      { name: 'Google Drive Picker', status: true, icon: FolderOpen, color: 'text-cyan-400' },
                      { name: 'Google Sheets', status: true, icon: FileSpreadsheet, color: 'text-emerald-400' },
                    ].map((svc, i) => (
                      <div key={i} className="flex justify-between items-center pt-2 border-t border-slate-800 first:border-0 first:pt-0">
                        <div className="flex items-center gap-3">
                          <svc.icon className={`w-4 h-4 ${svc.color}`} />
                          <span className="text-sm font-medium text-slate-200">{svc.name}</span>
                        </div>
                        {svc.status ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Third-party API Keys */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-full">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-500" /> Third-Party API Keys
                </h3>
                <div className="space-y-4 max-w-lg">
                  <p className="text-xs text-slate-400 font-mono">Manual configuration for external SDK keys (if not automatically injected by environment variables).</p>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Stripe Secret Key</label>
                    <input type="password" placeholder="sk_test_..." className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">OpenAI API Key</label>
                    <input type="password" placeholder="sk-..." className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold transition">
                    Save Configuration
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="flex-1 flex flex-col space-y-8 max-w-5xl mx-auto w-full pb-8">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2"><CreditCard className="w-6 h-6 text-indigo-400"/> My Subscriptions</h2>
                  <p className="text-sm text-slate-500 mt-1">Unlock premium AI models and comprehensive training sets.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Single Model Subscriptions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SubscriptionCard 
                      id="metahuman" name="MetaHuman" description="Ultra-realistic avatar rendering" 
                      icon={Layers} colorIcon={{bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400'}} 
                      priceObj={{monthly: '$15 / Month', weekly: '$9 / Week', daily: '$5 / Day'}} 
                      isSubscribed={userSubscriptions.includes('metahuman')} 
                      onSubscribeClick={() => setPendingSubscription({id: 'metahuman', name: 'MetaHuman', pricing: '$15 / Month'})} 
                    />
                    <SubscriptionCard 
                      id="gaussian" name="Gaussian" description="3D Splatting & environmental mapping" 
                      icon={Box} colorIcon={{bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400'}} 
                      priceObj={{monthly: '$13 / Month', weekly: '$7 / Week', daily: '$4 / Day'}} 
                      isSubscribed={userSubscriptions.includes('gaussian')} 
                      onSubscribeClick={() => setPendingSubscription({id: 'gaussian', name: 'Gaussian', pricing: '$13 / Month'})} 
                    />
                    <SubscriptionCard 
                      id="genvideo" name="Video" description="Temporal video generation models" 
                      icon={Play} colorIcon={{bg: 'bg-pink-500/20', border: 'border-pink-500/50', text: 'text-pink-400'}} 
                      priceObj={{monthly: '$10 / Month', weekly: '$6 / Week', daily: '$1.50 / Day'}} 
                      isSubscribed={userSubscriptions.includes('genvideo')} 
                      onSubscribeClick={() => setPendingSubscription({id: 'genvideo', name: 'Video', pricing: '$10 / Month'})} 
                    />
                    <SubscriptionCard 
                      id="glypheral" name="Glypheral" description="Advanced data quantization glyphs" 
                      icon={Box} colorIcon={{bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400'}} 
                      priceObj={{monthly: '$35 / Month', weekly: '$22 / Week', daily: '$16 / Day'}} 
                      isSubscribed={userSubscriptions.includes('glypheral')} 
                      onSubscribeClick={() => setPendingSubscription({id: 'glypheral', name: 'Glypheral', pricing: '$35 / Month'})} 
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2"><Lock className="w-4 h-4 text-cyan-400" /> Package Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SubscriptionCard 
                      id="ultra" name="Ultra Package" description="Unrestricted access to all MetaHuman, Gaussian, and Video datasets alongside unlimited model initializations." 
                      icon={Star} colorIcon={{bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', bgActive: 'bg-cyan-600'}} 
                      priceObj={{monthly: '$40 / Month', weekly: '$32 / Week', daily: '$20 / Day'}} 
                      isSubscribed={userSubscriptions.includes('ultra')} isPackage
                      onSubscribeClick={() => setPendingSubscription({id: 'ultra,metahuman,gaussian,genvideo', name: 'Ultra Package', pricing: '$40 / Month'})} 
                    />
                    <SubscriptionCard 
                      id="ultramite" name="Ultramite Package" description="Complete access including Glypheral features, combining all 4 dataset types and their respective model classes." 
                      icon={Star} colorIcon={{bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/50', text: 'text-fuchsia-400', bgActive: 'bg-fuchsia-600'}} 
                      priceObj={{monthly: '$80 / Month', weekly: '$44 / Week', daily: '$25 / Day'}} 
                      isSubscribed={userSubscriptions.includes('ultramite')} isPackage
                      onSubscribeClick={() => setPendingSubscription({id: 'ultramite,metahuman,gaussian,genvideo,glypheral', name: 'Ultramite Package', pricing: '$80 / Month'})} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <SubscriptionConfirmationModal 
           isOpen={!!pendingSubscription} 
           item={pendingSubscription} 
           onConfirm={handleConfirmSubscription} 
           isLoading={isSubscribing}
           error={subscriptionError}
           onCancel={() => {
             setPendingSubscription(null);
             setSubscriptionError('');
           }} 
        />
        
        {/* Bottom Status Bar */}
        <footer className="h-8 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-4 shrink-0 text-[10px] font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase">Instance:</span>
              <span className="text-white">v-node-X4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase">Latency:</span>
              <span className="text-emerald-400">8ms</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Activity className="w-3 h-3" /> System Nominal
            </div>
          </div>
        </footer>

        {/* Marketplace Publish Modal */}
        {showMarketplaceModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2"><Store className="w-5 h-5 text-emerald-400" /> Publish to Marketplace</h2>
                <button 
                  onClick={() => { setShowMarketplaceModal(null); setPublishError(''); }} 
                  className="text-slate-500 hover:text-white transition-colors"
                  disabled={isPublishing}
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed font-mono mb-4">
                  Publishing this custom model will make it available to the SuperAI community. You will receive 75% of the sales, with a 25% tax allocated to platform services and developer updates.
                </p>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Selling Price (USD)</label>
                  <input type="number" 
                         value={publishForm.price} 
                         disabled={isPublishing}
                         onChange={(e) => setPublishForm({...publishForm, price: parseFloat(e.target.value)})}
                         className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Model Description</label>
                  <textarea rows={4}
                            value={publishForm.description}
                            disabled={isPublishing}
                            onChange={(e) => setPublishForm({...publishForm, description: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none resize-none"
                            placeholder="Describe what your model excels at..."></textarea>
                </div>

                {publishError && <p className="text-red-400 text-xs font-mono">{publishError}</p>}
                
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 relative z-10">
                  <button 
                    disabled={isPublishing}
                    onClick={() => { setShowMarketplaceModal(null); setPublishError(''); }} 
                    className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button onClick={() => {
                     setPublishError('');
                     if (publishForm.price < 0) {
                        setPublishError('Price must be greater than or equal to 0.');
                        return;
                     }
                     if (publishForm.description.trim().length < 10) {
                        setPublishError('Description must be at least 10 characters.');
                        return;
                     }
                     setIsPublishing(true);
                     setTimeout(() => {
                         setIsPublishing(false);
                         const m = models.find(x => x.id === showMarketplaceModal);
                         if (m) {
                            setMarketplaceModels([...marketplaceModels, {
                               id: Date.now(),
                               name: m.name,
                               author: currentUsername || 'Unknown',
                               type: m.type,
                               price: publishForm.price,
                               rating: 0,
                               description: publishForm.description,
                               reviews: []
                            }]);
                            setShowMarketplaceModal(null);
                            setActiveTab('marketplace');
                         }
                     }, 1500);
                  }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400/50 text-white rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center">
                    {isPublishing ? <><RefreshCw className="w-3 h-3 mr-2 animate-spin" /> Publishing...</> : <><CheckCircle2 className="w-4 h-4 mr-2" /> Publish Model</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

