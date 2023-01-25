export interface StrongPasswordOptions {
    minLength?: number | undefined;
    minLowercase?: number | undefined;
    minUppercase?: number | undefined;
    minNumbers?: number | undefined;
    minSymbols?: number | undefined;
    returnScore?: boolean | undefined;
    pointsPerUnique?: number | undefined;
    pointsPerRepeat?: number | undefined;
    pointsForContainingLower?: number | undefined;
    pointsForContainingUpper?: number | undefined;
    pointsForContainingNumber?: number | undefined;
    pointsForContainingSymbol?: number | undefined;
}

export type DoneFunction = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

export interface IProtectOptions {
    allowIf?: 'authenticated' | 'unauthenticated',
    orRedirectTo?: string,
    orSendError?:string
};