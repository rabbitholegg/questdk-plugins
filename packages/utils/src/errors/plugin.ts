export class PluginActionNotImplementedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PluginActionNotImplementedError";
  }
}
