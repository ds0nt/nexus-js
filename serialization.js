



export class JSON {
    serialize(packet) {
        return JSON.stringify(packet)
    }
    deserialize(bytes) {
        return JSON.parse(bytes)
    }
}

export class Delimited {
    delimiter = ":"
    serialize(packet) {

        return "" +
            packet.type.length + this.delimiter +
            packet.id.length + this.delimiter +
            packet.type +
            packet.id +
            packet.data
    }

    deserialize(str) {
        let lenType
        let lenStreamID
        let peices = str.split(this.delimiter, 3)
        if (peices.length != 3) {
            console.log("delimiter not found in message bytes", str)
            return
        }
        try {
            lenType = parseInt(peices[0])
            lenStreamID = parseInt(peices[1])
        } catch (e) {
            console.log("could not parse message length prefixes", str)
            return
        }

        if (peices[2].length < lenType + lenStreamID) {
            console.log("delimited message data bytes too short", str)
            return
        }

        return {
            type: peices[2].substring(0, lenType),
            id: peices[2].substring(lenType, lenType + lenStreamID),
            data: peices[2].substring(lenType + lenStreamID),
        }
    }
}