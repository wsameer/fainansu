# Zustand State Management Setup

This document describes the robust Zustand integration for managing client-side state in the Fainansu web application, following best practices used by senior developers at top tech companies.

## Overview

Zustand is a small, fast, and scalable state management solution for React applications. This setup provides:

- **Immer integration** for immutable state updates
- **DevTools support** for debugging in development
- **Persist middleware** for storing state in localStorage/sessionStorage
- **TypeScript support** with full type safety
- **Modular architecture** with separate stores for different domains

## Architecture

```
src/lib/stores/
├── index.ts          # Main exports
├── types.ts          # Shared types and interfaces
├── base-store.ts     # Utility functions for creating stores
└── ui-store.ts       # Example UI state store
```

## Core Principles

### 1. Separation of Concerns

- **Server State**: Use TanStack Query for API data, caching, and synchronization
- **Client State**: Use Zustand for UI state, user preferences, and app-level state
- **Local State**: Use React's useState/useReducer for component-specific state

### 2. Immutable Updates

All state mutations use Immer for predictable, immutable updates:

```typescript
// ✅ Good - Immutable with Immer
set((state) => {
  state.user.name = "John";
});

// ❌ Bad - Manual immutability
set((state) => ({
  ...state,
  user: {
    ...state.user,
    name: "John",
  },
}));
```

### 3. Type Safety

All stores are fully typed with TypeScript interfaces:

```typescript
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
}
```

## Store Creation Patterns

### Basic Store

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "my-store" }
  )
);
```

### Store with Persistence

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        language: "en",
        setTheme: (theme) => set({ theme }),
        setLanguage: (lang) => set({ language: lang }),
      }),
      {
        name: "settings-storage",
        // Optional: customize storage
        // storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "settings-store" }
  )
);
```

### Store with Immer (Recommended)

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useComplexStore = create<ComplexState>()(
  immer(
    devtools(
      (set) => ({
        data: { nested: { value: 0 } },
        updateNested: (value) =>
          set((state) => {
            state.data.nested.value = value;
          }),
      }),
      { name: "complex-store" }
    )
  )
);
```

## Usage in Components

### Basic Usage

```typescript
import { useUiStore } from '@/lib/stores';

function MyComponent() {
  const { globalLoading, setGlobalLoading } = useUiStore();

  const handleAction = async () => {
    setGlobalLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div>
      {globalLoading && <Spinner />}
      <button onClick={handleAction}>Do Something</button>
    </div>
  );
}
```

### Selective State Selection

```typescript
// ✅ Good - Only subscribe to needed state
const count = useMyStore((state) => state.count);

// ❌ Bad - Subscribes to entire store
const store = useMyStore();
const count = store.count;
```

### Actions with Side Effects

```typescript
// In store
export const useAuthStore = create<AuthState>()(
  immer(
    devtools(
      (set, get) => ({
        user: null,
        login: async (credentials) => {
          set((state) => {
            state.loading = true;
          });
          try {
            const user = await api.login(credentials);
            set((state) => {
              state.user = user;
              state.loading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error.message;
              state.loading = false;
            });
          }
        },
      }),
      { name: "auth-store" }
    )
  )
);
```

## UI Store Example

The included `ui-store.ts` demonstrates a comprehensive UI state management pattern:

```typescript
import { useUiStore } from '@/lib/stores';

function App() {
  const {
    addNotification,
    openModal,
    globalLoading,
    sidebarOpen,
    toggleSidebar
  } = useUiStore();

  const handleSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
    });
  };

  const handleError = () => {
    addNotification({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong',
      duration: 10000, // Longer duration for errors
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
    </div>
  );
}
```

## Best Practices

### 1. Store Organization

- Group related state in dedicated stores
- Keep stores focused on specific domains (auth, ui, settings, etc.)
- Use descriptive store names for DevTools

### 2. State Structure

- Prefer flat state structures when possible
- Use nested objects sparingly and only when necessary
- Normalize data relationships like a database

### 3. Actions

- Keep actions pure and predictable
- Handle async operations within actions
- Use consistent naming: `setX`, `addX`, `removeX`, `toggleX`

### 4. Selectors

- Create custom selectors for complex derived state
- Memoize expensive selectors with `useMemo`
- Avoid computing derived state in components

### 5. Performance

- Use selective subscriptions to prevent unnecessary re-renders
- Avoid storing large objects in state
- Consider using `shallow` comparison for complex objects

### 6. Testing

```typescript
// Example test
import { act, renderHook } from "@testing-library/react";
import { useCounterStore } from "./stores";

test("increment counter", () => {
  const { result } = renderHook(() => useCounterStore());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## DevTools Integration

All stores include DevTools support for development:

1. Install React DevTools browser extension
2. Open DevTools → Zustand tab
3. Monitor state changes, actions, and time travel debugging

## Migration from Context/Redux

### From Context

```typescript
// Before: Context
const { state, dispatch } = useContext(MyContext);

// After: Zustand
const state = useMyStore();
```

### From Redux

```typescript
// Before: Redux
const dispatch = useDispatch();
dispatch(myAction(payload));

// After: Zustand
const myAction = useMyStore((state) => state.myAction);
myAction(payload);
```

## Common Patterns

### Optimistic Updates

```typescript
updateItem: async (id, newData) => {
  const previousData = get().items[id];

  // Optimistic update
  set((state) => {
    state.items[id] = { ...state.items[id], ...newData };
  });

  try {
    await api.updateItem(id, newData);
  } catch (error) {
    // Revert on error
    set((state) => {
      state.items[id] = previousData;
    });
  }
};
```

### Loading States

```typescript
setLoading: (key, loading) => {
  set((state) => {
    if (loading) {
      state.loadingStates[key] = true;
    } else {
      delete state.loadingStates[key];
    }
  });
},

// Usage
const isLoading = useStore((state) => !!state.loadingStates['save-user']);
```

## Troubleshooting

### State Not Updating

- Check if you're using Immer correctly (mutate the draft, don't return new state)
- Verify the component is subscribed to the changing state

### Performance Issues

- Use `shallow` comparison for objects/arrays
- Create memoized selectors for expensive computations
- Split large stores into smaller, focused ones

### TypeScript Errors

- Ensure all state properties are included in the interface
- Use `WritableDraft<T>` for Immer mutations
- Import types from the store files

## Resources

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Immer Documentation](https://immerjs.github.io/immer/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## Contributing

When adding new stores:

1. Create a new file in `src/lib/stores/`
2. Export from `index.ts`
3. Follow the established patterns (Immer, DevTools, TypeScript)
4. Add documentation for complex stores
5. Test the store integration
