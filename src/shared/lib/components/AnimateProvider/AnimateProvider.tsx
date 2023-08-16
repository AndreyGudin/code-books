import {
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
  useState,
  useMemo
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Spring?: SpringType;
  Gesture?: GestureType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

const getAsyncAnimationModules = async (): Promise<
  [SpringType, GestureType]
> => {
  return Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react')
  ]);
};

export const useAnimationLibs = (): Required<AnimationContextPayload> => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules()
      .then(([Spring, Gesture]) => {
        SpringRef.current = Spring;
        GestureRef.current = Gesture;
        setIsLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const libs = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded
    }),
    [isLoaded]
  );

  return (
    <AnimationContext.Provider value={libs}>
      {children}
    </AnimationContext.Provider>
  );
};
