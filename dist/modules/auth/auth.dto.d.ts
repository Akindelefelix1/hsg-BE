export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto extends LoginDto {
    name: string;
}
export declare class RefreshDto {
    refreshToken: string;
}
