import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
export class FooBarBazDayonDattayon {
    myProperty;
    constructor() {
        this.myProperty = 0;
    }
    static serialize(value) {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }
    static serializeCore(writer, value) {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }
        writer.writeObjectHeader(1);
        writer.writeInt32(value.myProperty);
    }
    static serializeArray(value) {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }
    static serializeArrayCore(writer, value) {
        writer.writeArray(value, (writer, x) => FooBarBazDayonDattayon.serializeCore(writer, x));
    }
    static deserialize(buffer) {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }
    static deserializeCore(reader) {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }
        const value = new FooBarBazDayonDattayon();
        if (count == 1) {
            value.myProperty = reader.readInt32();
        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0)
                return value;
            value.myProperty = reader.readInt32();
            if (count == 1)
                return value;
        }
        return value;
    }
    static deserializeArray(buffer) {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }
    static deserializeArrayCore(reader) {
        return reader.readArray(reader => FooBarBazDayonDattayon.deserializeCore(reader));
    }
}
//# sourceMappingURL=FooBarBazDayonDattayon.js.map