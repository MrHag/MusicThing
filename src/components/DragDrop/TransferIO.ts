export default class TransferIO {
  transfer: DataTransfer;

  constructor(transfer: DataTransfer) {
    this.transfer = transfer;
  }

  static from(transfer: DataTransfer) {
    return new TransferIO(transfer);
  }

  get(key: string) {
    for (let slice of this.transfer.types) {
      if (!slice.startsWith(key)) continue;

      return TransferIO.splitValues(slice);
    }
    return [];
  }

  hasKey(key: string) {
    for (let slice of this.transfer.types) {
      if (slice.startsWith(key)) return true;
    }
    return false;
  }

  hasValue(key: string, value: string) {
    for (let slice of this.transfer.types) {
      if (!slice.startsWith(key)) continue;

      const split = slice.split("\n");
      return split.slice(1).includes(value);
    }
    return false;
  }

  private find(key: string) {
    for (let slice of this.transfer.types) {
      if (slice.startsWith(key)) return slice;
    }
    return undefined;
  }

  private static splitValues(str: string) {
    const split = str.split("\n");
    return split.slice(1);
  }

  add<T>(key: string, value: ToString<T>) {
    const strValue = value.toString();
    const slice = this.find(key);

    if (slice) {
      this.transfer.clearData(slice);
      this.transfer.setData(`${slice}\n${strValue}`, " ");
    } else this.transfer.setData(`${key}\n${strValue}`, " ");
  }
}

interface ToString<T> {
  toString(radix?: T): string;
}
