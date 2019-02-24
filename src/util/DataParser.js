export function getQualificationMatches(data){
    qualificationMatches = []

    data.map(match => {
        if(match.comp_level == "qm"){
            qualificationMatches.push(match);
        }
    })

    qualificationMatches.sort(function(a, b) {
        var match_number_1 = a.match_number
        var match_number_2 = b.match_number

        if(match_number_1 < match_number_2) return -1;
        else if (match_number_1 > match_number_2) return 1;
        else return 0;
    })

    return qualificationMatches;
}

export function getTeamKeysForMatch(data, match_number, alliance_color){
    teams = [];
    matches = getQualificationMatches(data);

    matches.map(qm => {
        if(qm.match_number == match_number){
            alliance = qm.alliances[alliance_color]
            alliance.team_keys.map(team => {
                teams.push(team.substring(3))
            })
        }
    })

    return teams
}