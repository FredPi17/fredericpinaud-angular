export interface BlogKeywords {
    status?: string;
    message?: string;
    id?: number;
    name?: string;
}

export interface Posts {
    status?: string;
    message?: string;
    id?: number;
    titre?: string;
    contenu?: string;
    categorie?: string;
    keywords?: string;
    creation_date?: string;
    update_date?: string;
}