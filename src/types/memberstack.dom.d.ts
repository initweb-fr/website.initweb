declare module '@memberstack/dom' {
  const memberstackDOM: {
    init: (options: { publicKey: string }) => Promise<void>;
  };
  export default memberstackDOM;
}
