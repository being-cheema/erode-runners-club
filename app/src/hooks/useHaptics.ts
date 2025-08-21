import { useCallback } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export interface UseHapticsReturn {
  lightHaptic: () => Promise<void>;
  mediumHaptic: () => Promise<void>;
  heavyHaptic: () => Promise<void>;
  selectionHaptic: () => Promise<void>;
  successHaptic: () => Promise<void>;
  warningHaptic: () => Promise<void>;
  errorHaptic: () => Promise<void>;
}

export function useHaptics(): UseHapticsReturn {
  const lightHaptic = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Haptics not available on web/desktop
      console.debug('Haptics not available:', error);
    }
  }, []);

  const mediumHaptic = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  const heavyHaptic = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  const selectionHaptic = useCallback(async () => {
    try {
      await Haptics.selectionStart();
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  const successHaptic = useCallback(async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  const warningHaptic = useCallback(async () => {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  const errorHaptic = useCallback(async () => {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, []);

  return {
    lightHaptic,
    mediumHaptic,
    heavyHaptic,
    selectionHaptic,
    successHaptic,
    warningHaptic,
    errorHaptic,
  };
}