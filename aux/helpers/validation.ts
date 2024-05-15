
export type validation = {
    isValid: boolean,
    message?: string | unknown,
};

export function isInt(n: any): boolean{
    if(isNaN(n)){
        return false
    }

    return true
}

export function isString(value: any): boolean {
    if (isNaN(value)){
        return typeof value === 'string';
    }

    return false
}

