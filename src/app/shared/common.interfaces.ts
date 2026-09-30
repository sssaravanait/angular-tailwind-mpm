export interface Customer {
    id: number;
    title: string | null;
    education: string | null;
    name: string | null;
    surname: string | null;
    birth_date: Date | null;
    gender: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    source: string | null;
    device: string | null;
    country_code: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Gender {
    label: string;
    value: string;
}

export interface City {
    id: number;
    label: string;
}