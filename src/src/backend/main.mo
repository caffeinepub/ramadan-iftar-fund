import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Array "mo:core/Array";

actor {
  type Donation = {
    amount : Nat;
    timestamp : Time.Time;
  };

  type CampaignStats = {
    totalAmount : Nat;
    mealsSponsored : Nat;
    targetMeals : Nat;
    percentageComplete : Float;
  };

  var donations : [Donation] = [];
  var totalAmountRaised = 0;
  let mealCost = 50;
  let targetMeals = 1000;

  public shared ({ caller }) func makeDonation(amount : Nat) : async () {
    let donation : Donation = {
      amount;
      timestamp = Time.now();
    };

    donations := donations.concat([donation]);
    totalAmountRaised += amount;
  };

  public query ({ caller }) func getTotalAmountRaised() : async Nat {
    totalAmountRaised;
  };

  public query ({ caller }) func getMealsSponsored() : async Nat {
    totalAmountRaised / mealCost;
  };

  public query ({ caller }) func getCampaignStats() : async CampaignStats {
    let mealsSponsored = totalAmountRaised / mealCost;
    let percentageComplete = if (targetMeals == 0) { 0.0 } else {
      (mealsSponsored.toFloat() / targetMeals.toFloat()) * 100.0;
    };

    {
      totalAmount = totalAmountRaised;
      mealsSponsored;
      targetMeals;
      percentageComplete;
    };
  };

  public query ({ caller }) func getAllDonations() : async [Donation] {
    donations;
  };
};
