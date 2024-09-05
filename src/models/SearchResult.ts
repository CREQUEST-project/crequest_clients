interface Function {
    label: string;
    detail_label: string;
    id: string;
}

export interface Match {
    factor_id: string;
    sq: string;
    de: string;
    function_label?: Function;
    start: number;
    end: number;
    color: string;
    active?: boolean;
}

export interface SearchResultGuest {
    original_sequence: string;
    reverse_complement_sequence: string;
    forward_strand_matches: Match[];
    reverse_strand_matches: Match[];
}

export interface SearchResultUser {
    original_sequence: string;
    reverse_complement_sequence: string;
    forward_strand_matches: Match[];
    reverse_strand_matches: Match[];
    history_id: number;
}