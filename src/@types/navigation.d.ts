export type ProductNaviagtionProps = {
    id?: string;
}

export type OrderNaviagtionProps = {
    id: string;
}

export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            Home: undefined;
            Product: ProductNaviagtionProps;
            Order: OrderNaviagtionProps;
            Orders: undefined;
        }
    }
}