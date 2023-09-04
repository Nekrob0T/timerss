export default function useUniqueId(): any {
  function uid(): string {
    return (
      Math.random().toString(36).substring(5) +
      Date.now().toString(36).substring(5) +
      Math.random().toString(36).substring(5)
    );
  }

  return { uid };
}
