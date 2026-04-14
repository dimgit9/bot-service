export abstract class TransactionPort {
  abstract run<T>(callback: () => Promise<T>): Promise<T>;
}
