import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Donation {
    timestamp: Time;
    amount: bigint;
}
export type Time = bigint;
export interface CampaignStats {
    percentageComplete: number;
    targetMeals: bigint;
    totalAmount: bigint;
    mealsSponsored: bigint;
}
export interface backendInterface {
    getAllDonations(): Promise<Array<Donation>>;
    getCampaignStats(): Promise<CampaignStats>;
    getMealsSponsored(): Promise<bigint>;
    getTotalAmountRaised(): Promise<bigint>;
    makeDonation(amount: bigint): Promise<void>;
}
