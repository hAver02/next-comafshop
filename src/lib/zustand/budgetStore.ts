import { create } from "zustand";
import { Budgets } from "../../../types/BudgetsTypes";


interface Budget {
    budgets : Budgets[],
    saveBudget: (budgets : Budgets[]) => void,
    deleteBudget : (id : number) => void
}

export const useBudgetStor = create<Budget>((set, get) : any => {
    return {
        budgets : [],
        saveBudget : (budgets : Budgets[]) => {
            set({budgets : budgets});
        },
        deleteBudget : (id: number) => {
            const { budgets} = get();
            const copyBudgets = structuredClone(budgets);
            const findIndex = copyBudgets.findIndex(bud => bud.id == id);
            if(findIndex == -1) return;
            copyBudgets.splice(findIndex,1);
            set({budgets : copyBudgets})
        }
    }
})