export type CredencialUser = {
    username: string
    password: string
}

export type Role = {
    idRole: number
    name: string
}

export type MeanOfPayment = {
    idMeanOfPayment: number
    name: string
}

export type ActivityType = {
    idActivityType: number
    name: string
}

// -----------------------------------------------------

export type Person = {
    idPerson: number
    name: string
    firstLastName: string
    secondLastName: string
    birthday: Date
    identificationNumber: string
    email: string
    phoneNumber: string
    gender: string
}

export type User = {
    idUser: number
    person: Person
    role: Role
    username: string
    isDeleted: number
    token: string
}

export type UserDataForm = {
    idRole: number
    idUser: number
    idPerson: number
    name: string
    firstLastName: string
    secondLastName: string
    birthday: Date
    identificationNumber: string
    email: string
    phoneNumber: string
    gender: string
    username: string
    isDeleted: number
    password: string
    confirmPassword: string
}

// -----------------------------------------------------

export type EconomicIncome = {
    idEconomicIncome: number
    user: User
    registrationDate: Date
    voucherNumber: string
    detail: string
    meanOfPayment: MeanOfPayment
    amount: number
    activityType: ActivityType
    isDeleted: number
}

export type EconomicIncomeDataForm = {
    idEconomicIncome: number
    idUser: User['idUser']
    registrationDate: Date
    voucherNumber: string
    detail: string
    idMeanOfPayment: MeanOfPayment['idMeanOfPayment']
    amount: number
    idActivityType: ActivityType['idActivityType']
    isDeleted: number
}

export type EconomicExpense = Omit<EconomicIncome, "activityType" | "idEconomicIncome"> & {
    idEconomicExpense: number
}

export type EconomicExpenseDataForm = Omit<EconomicIncomeDataForm, 'idActivityType' | "idEconomicIncome"> & {
    idEconomicExpense: number
}

// -----------------------------------------------------

export type ProductInventory = {
    idProductInventory: number
    user: User
    code: string
    name: string
    quantity: number
    cost: number
    isDeleted: number
}

export type ProductInventoryDataForm = Omit<ProductInventory, 'user'> & {
    idUser: User['idUser']
}