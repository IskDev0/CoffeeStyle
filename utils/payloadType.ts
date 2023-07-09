type PayloadType = {
    eventType: string;
    new: {
        id: number;
        created_at: string;
        title: string;
        price: number; description: string;
        image: string; discount: number;
    };
    old: {
        id: number;
    };
}