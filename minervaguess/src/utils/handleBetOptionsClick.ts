import { BetProperties } from "@/interfaces/betInterface";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export function handleCheckKills(
  fieldId: "killHigh" | "killLow" | "killSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "killHigh") {
    form.setValue("killLow", false);
    form.setValue("killSpecific", "");
    multiplier = BetProperties.kills.highMultiplier;
  } else if (fieldId === "killLow") {
    form.setValue("killHigh", false);
    form.setValue("killSpecific", "");
    multiplier = BetProperties.kills.lowMultiplier;
  } else if (fieldId === "killSpecific") {
    form.setValue("killHigh", false);
    form.setValue("killLow", false);
    multiplier = BetProperties.exactMultiplier;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, currentValue);

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "kill"
    );

    return [["kill", multiplier], ...newMultipliers];
  });
}

export function handleCheckDeaths(
  fieldId: "deathHigh" | "deathLow" | "deathSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;

  if (fieldId === "deathHigh") {
    form.setValue("deathLow", false);
    form.setValue("deathSpecific", "");
    multiplier = BetProperties.deaths.highMultiplier;
  } else if (fieldId === "deathLow") {
    form.setValue("deathHigh", false);
    form.setValue("deathSpecific", "");
    multiplier = BetProperties.deaths.lowMultiplier;
  } else if (fieldId === "deathSpecific") {
    form.setValue("deathHigh", false);
    form.setValue("deathLow", false);
    multiplier = BetProperties.exactMultiplier;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, currentValue);

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "death"
    );

    return [["death", multiplier], ...newMultipliers];
  });
}

export function handleCheckAssists(
  fieldId: "assistHigh" | "assistLow" | "assistSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "assistHigh") {
    form.setValue("assistLow", false);
    form.setValue("assistSpecific", "");
    multiplier = BetProperties.assists.highMultiplier;
  } else if (fieldId === "assistLow") {
    form.setValue("assistHigh", false);
    form.setValue("assistSpecific", "");
    multiplier = BetProperties.assists.lowMultiplier;
  } else if (fieldId === "assistSpecific") {
    form.setValue("assistHigh", false);
    form.setValue("assistLow", false);
    multiplier = BetProperties.exactMultiplier;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, currentValue);

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "assist"
    );

    return [["assist", multiplier], ...newMultipliers];
  });
}

export function handleCheckResult(
  fieldId: "win" | "lose",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "win") {
    form.setValue("lose", false);
    multiplier = BetProperties.exactMultiplier;
  } else if (fieldId === "lose") {
    form.setValue("win", false);
    multiplier = BetProperties.exactMultiplier;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, currentValue);

  if (currentValue === false) {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "result"
    );

    return [["result", multiplier], ...newMultipliers];
  });
}
