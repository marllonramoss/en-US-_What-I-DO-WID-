// src/values/Name.ts

export class Name {
    private readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    private validate(value: string): void {
        if (value.length < 1 || value.length > 100) {
            throw new Error('Name must be between 1 and 100 characters');
        }
        
    }

    public getValue(): string {
        return this.value;
    }
}
