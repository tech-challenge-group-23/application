export type validation = {
    isValid: boolean,
    message?: string | unknown,
};

export function isInt(n: any){
    return Number(n) === n && n % 1 === 0;
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

