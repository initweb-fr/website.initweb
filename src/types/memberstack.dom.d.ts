declare module '@memberstack/dom' {
  const memberstackDOM: {
    init: (options: { publicKey: string }) => Promise<void>;
  };
  export default memberstackDOM;
}

// Types globaux pour l'API Memberstack
declare global {
  interface Window {
    $memberstackDom: {
      getCurrentMember: () => Promise<{
        data: {
          id: string;
          customFields?: Record<string, unknown>;
        } | null;
      }>;
      updateMemberJSON: (data: Record<string, unknown>) => Promise<void>;
      updateMember: (data: { customFields: Record<string, unknown> }) => Promise<void>;
    };
  }
}
