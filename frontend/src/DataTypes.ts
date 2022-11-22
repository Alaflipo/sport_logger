export interface ActivityData {
    id?: number;
    name: string;
    description: string;
    type: string;
    seat_settings: number;
    other_settings: string;  

}

export const SportTypes = [
    { label: "Shoulders" },
    { label: "Chest" },
    { label: "Biceps" },
    { label: "Back" },
    { label: "Belly" },
];

export const emptyActivityData: ActivityData = {
    name: " ",
    description: " ",
    type: "Shoulders",
    seat_settings: 1, 
    other_settings: " ",
};

export interface PersonalActivityData {
    id?: number;
    activity: number | string;
    person: number | string;
    weight: number;
    date: string; 
}

export const emptyPersonalActivityData: PersonalActivityData = {
    activity: '',
    person: '',
    weight: 0, 
    date: '', 
};

export interface UserData {
    id?: number; 
    name: string; 
}