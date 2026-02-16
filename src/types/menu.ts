// - MenuModifierGroupOption
export interface MenuModifierOptionDto {
    readonly id: string;
    menuItemModifierGroupId: string;
    modifierOptionName: string;
    effectivePriceDelta: number;
    isDefault: boolean;
    isAvailable: boolean;
}


// - MenuModifierGroup
export interface MenuItemModifierGroupDto {
    readonly id: string;
    menuItemId: string;
    modifierGroupName: string;
    selectionType: MenuItemModifierGroupSelectionType;
    isRequired: boolean;
    sortOrder: number;
    options?: MenuModifierOptionDto[];
}
export type MenuItemModifierGroupSelectionType = "single" | "multiple";


// - MenuItem
export interface MenuItemDto {
    readonly id: string;
    categoryId: string;
    categoryName?: string;
    name: string;
    description?: string;
    basePrice: number;
    imageUrl?: string;
    tags?: MenuItemTags;
    isActive: boolean;
    modifierGroups?: MenuItemModifierGroupDto[];
    createdAt: string;
    updatedAt: string;
}


export type MenuItemTags = "vegetarian" | "popular";


// - MenuCategory
export interface MenuCategoryDto {
    readonly id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
    menuItems?: MenuItemDto[];
    createdAt: string;
    updatedAt: string;
}