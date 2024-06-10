export async function getSchedule() {
    const date = new Date();
    const dateString = date.toISOString();
    const [days, time] = dateString.split("T");

    const [YYYY, MM, DD] = days.split("-");

    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const url = `https://statsapi.mlb.com/api/v1/schedule?lang=en&sportId=11,12,13,14,15,16,5442&hydrate=team(venue(timezone,location)),venue(timezone,location),game(seriesStatus,seriesSummary,tickets,promotions,sponsorships,content(summary,media(epg))),seriesStatus,seriesSummary,decisions,person,linescore,broadcasts(all),tickets,event(tickets),radioBroadcasts&season=${YYYY}&startDate=${YYYY}-${MM}-01&endDate=${YYYY}-${MM}-${lastDayOfMonth}&teamId=247&eventTypes=primary&scheduleTypes=games,events,xref`;

    try {
        const res = await fetch(url);
        const data = (await res.json()) as BaronsScheduleResponse;

        const games = data.dates;
        const currentGamesIndex = games.findIndex((game) => {
            const gameDate = new Date(game.date);
            const gameIsInFuture = gameDate > date;
            return gameIsInFuture;
        });

        const upcomingGames = games
            .slice(currentGamesIndex, currentGamesIndex + 7)
            .filter((gameDate) => gameDate.totalGames)
            .map((gameDate) => {
                const [game] = gameDate.games;

                const awayTeam = game.teams.away.team.name;
                const homeTeam = game.teams.home.team.name;
                const venue = game.venue.name;
                const type = venue === "Regions Field" ? "**HOME**" : "AWAY";
                const localizedDate = new Date(game.gameDate).toLocaleString();
                const [day, time] = localizedDate.split(", ");

                const formatted = `[${type}] ${awayTeam} @ ${homeTeam} (${day} at ${time.replace(/:00/g, "")})`;

                return { awayTeam, homeTeam, venue, day, time, formatted };
            });

        return upcomingGames;
    } catch (error) {
        console.log(error);
        return [{ formatted: "Couldn't scrape Barons data at this time" }];
    }
}

export interface BaronsScheduleResponse {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    dates: Date[];
}

export interface Date {
    date: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    games: Game[];
    events: any[];
}

export interface Game {
    gamePk: number;
    gameGuid: string;
    link: string;
    gameType: string;
    season: string;
    gameDate: string;
    officialDate: string;
    status: Status;
    teams: Teams;
    linescore: Linescore;
    decisions?: Decisions;
    venue: Venue3;
    promotions: Promotion[];
    broadcasts: Broadcast[];
    content: Content;
    seriesStatus: SeriesStatus;
    isTie?: boolean;
    gameNumber: number;
    publicFacing: boolean;
    doubleHeader: string;
    gamedayType: string;
    tiebreaker: string;
    calendarEventID: string;
    seasonDisplay: string;
    dayNight: string;
    scheduledInnings: number;
    reverseHomeAwayStatus: boolean;
    inningBreakLength: number;
    gamesInSeries: number;
    seriesGameNumber: number;
    seriesDescription: string;
    recordSource: string;
    ifNecessary: string;
    ifNecessaryDescription: string;
    tickets?: Ticket[];
    description?: string;
}

export interface Status {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
    abstractGameCode: string;
}

export interface Teams {
    away: Away;
    home: Home;
}

export interface Away {
    leagueRecord: LeagueRecord;
    score?: number;
    team: Team;
    isWinner?: boolean;
    splitSquad: boolean;
    seriesNumber: number;
}

export interface LeagueRecord {
    wins: number;
    losses: number;
    pct: string;
}

export interface Team {
    allStarStatus: string;
    id: number;
    name: string;
    link: string;
    season: number;
    venue: Venue;
    teamCode: string;
    fileCode: string;
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    league: League;
    division: Division;
    sport: Sport;
    shortName: string;
    parentOrgName: string;
    parentOrgId: number;
    franchiseName: string;
    clubName: string;
    active: boolean;
}

export interface Venue {
    id: number;
    name: string;
    link: string;
    location: Location;
    timeZone: TimeZone;
    active: boolean;
    season: string;
}

export interface Location {
    address1: string;
    city: string;
    state: string;
    stateAbbrev: string;
    postalCode: string;
    country: string;
}

export interface TimeZone {
    id: string;
    offset: number;
    offsetAtGameTime: number;
    tz: string;
}

export interface League {
    id: number;
    name: string;
    link: string;
}

export interface Division {
    id: number;
    name: string;
    link: string;
}

export interface Sport {
    id: number;
    link: string;
    name: string;
}

export interface Home {
    leagueRecord: LeagueRecord2;
    score?: number;
    team: Team2;
    isWinner?: boolean;
    splitSquad: boolean;
    seriesNumber: number;
}

export interface LeagueRecord2 {
    wins: number;
    losses: number;
    pct: string;
}

export interface Team2 {
    allStarStatus: string;
    id: number;
    name: string;
    link: string;
    season: number;
    venue: Venue2;
    teamCode: string;
    fileCode: string;
    abbreviation: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    league: League2;
    division: Division2;
    sport: Sport2;
    shortName: string;
    parentOrgName: string;
    parentOrgId: number;
    franchiseName: string;
    clubName: string;
    active: boolean;
}

export interface Venue2 {
    id: number;
    name: string;
    link: string;
    location: Location2;
    timeZone: TimeZone2;
    active: boolean;
    season: string;
}

export interface Location2 {
    address1: string;
    city: string;
    state: string;
    stateAbbrev: string;
    postalCode: string;
    country: string;
}

export interface TimeZone2 {
    id: string;
    offset: number;
    offsetAtGameTime: number;
    tz: string;
}

export interface League2 {
    id: number;
    name: string;
    link: string;
}

export interface Division2 {
    id: number;
    name: string;
    link: string;
}

export interface Sport2 {
    id: number;
    link: string;
    name: string;
}

export interface Linescore {
    currentInning?: number;
    currentInningOrdinal?: string;
    inningState?: string;
    inningHalf?: string;
    isTopInning?: boolean;
    scheduledInnings: number;
    innings: Inning[];
    teams: Teams2;
    defense: Defense;
    offense: Offense;
    balls?: number;
    strikes?: number;
    outs?: number;
}

export interface Inning {
    num: number;
    ordinalNum: string;
    home: Home2;
    away: Away2;
}

export interface Home2 {
    runs?: number;
    hits: number;
    errors: number;
    leftOnBase: number;
}

export interface Away2 {
    runs: number;
    hits: number;
    errors: number;
    leftOnBase: number;
}

export interface Teams2 {
    home: Home3;
    away: Away3;
}

export interface Home3 {
    runs?: number;
    hits?: number;
    errors?: number;
    leftOnBase?: number;
}

export interface Away3 {
    runs?: number;
    hits?: number;
    errors?: number;
    leftOnBase?: number;
}

export interface Defense {
    pitcher?: Pitcher;
    catcher?: Catcher;
    first?: First;
    second?: Second;
    third?: Third;
    shortstop?: Shortstop;
    left?: Left;
    center?: Center;
    right?: Right;
    batter?: Batter;
    onDeck?: OnDeck;
    inHole?: InHole;
    battingOrder?: number;
    team: Team3;
}

export interface Pitcher {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber?: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide;
    pitchHand: PitchHand;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    nameTitle?: string;
    nameSuffix?: string;
}

export interface PrimaryPosition {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide {
    code: string;
    description: string;
}

export interface PitchHand {
    code: string;
    description: string;
}

export interface Catcher {
    id: number;
    fullName: string;
    link: string;
}

export interface First {
    id: number;
    fullName: string;
    link: string;
}

export interface Second {
    id: number;
    fullName: string;
    link: string;
}

export interface Third {
    id: number;
    fullName: string;
    link: string;
}

export interface Shortstop {
    id: number;
    fullName: string;
    link: string;
}

export interface Left {
    id: number;
    fullName: string;
    link: string;
}

export interface Center {
    id: number;
    fullName: string;
    link: string;
}

export interface Right {
    id: number;
    fullName: string;
    link: string;
}

export interface Batter {
    id: number;
    fullName: string;
    link: string;
}

export interface OnDeck {
    id: number;
    fullName: string;
    link: string;
}

export interface InHole {
    id: number;
    fullName: string;
    link: string;
}

export interface Team3 {
    id: number;
    name: string;
    link: string;
}

export interface Offense {
    batter?: Batter2;
    onDeck?: OnDeck2;
    inHole?: InHole2;
    pitcher?: Pitcher2;
    battingOrder?: number;
    team: Team4;
}

export interface Batter2 {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince?: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition2;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear?: number;
    batSide: BatSide2;
    pitchHand: PitchHand2;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    nameMatrilineal?: string;
}

export interface PrimaryPosition2 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide2 {
    code: string;
    description: string;
}

export interface PitchHand2 {
    code: string;
    description: string;
}

export interface OnDeck2 {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition3;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide3;
    pitchHand: PitchHand3;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
}

export interface PrimaryPosition3 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide3 {
    code: string;
    description: string;
}

export interface PitchHand3 {
    code: string;
    description: string;
}

export interface InHole2 {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity?: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition4;
    useName: string;
    useLastName: string;
    middleName?: string;
    boxscoreName: string;
    gender: string;
    nameMatrilineal?: string;
    isPlayer: boolean;
    isVerified: boolean;
    batSide: BatSide4;
    pitchHand: PitchHand4;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    draftYear?: number;
}

export interface PrimaryPosition4 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide4 {
    code: string;
    description: string;
}

export interface PitchHand4 {
    code: string;
    description: string;
}

export interface Pitcher2 {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition5;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide5;
    pitchHand: PitchHand5;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    pronunciation?: string;
}

export interface PrimaryPosition5 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide5 {
    code: string;
    description: string;
}

export interface PitchHand5 {
    code: string;
    description: string;
}

export interface Team4 {
    id: number;
    name: string;
    link: string;
}

export interface Decisions {
    winner: Winner;
    loser: Loser;
    save: Save;
}

export interface Winner {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition6;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide6;
    pitchHand: PitchHand6;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
}

export interface PrimaryPosition6 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide6 {
    code: string;
    description: string;
}

export interface PitchHand6 {
    code: string;
    description: string;
}

export interface Loser {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber?: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition7;
    useName: string;
    useLastName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide7;
    pitchHand: PitchHand7;
    nameFirstLast: string;
    nameTitle?: string;
    nameSuffix?: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    middleName?: string;
}

export interface PrimaryPosition7 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide7 {
    code: string;
    description: string;
}

export interface PitchHand7 {
    code: string;
    description: string;
}

export interface Save {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber?: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    height: string;
    weight: number;
    active: boolean;
    primaryPosition: PrimaryPosition8;
    useName: string;
    useLastName: string;
    middleName: string;
    boxscoreName: string;
    gender: string;
    isPlayer: boolean;
    isVerified: boolean;
    draftYear: number;
    batSide: BatSide8;
    pitchHand: PitchHand8;
    nameFirstLast: string;
    nameSlug: string;
    firstLastName: string;
    lastFirstName: string;
    lastInitName: string;
    initLastName: string;
    fullFMLName: string;
    fullLFMName: string;
    strikeZoneTop: number;
    strikeZoneBottom: number;
    nameTitle?: string;
    nameSuffix?: string;
}

export interface PrimaryPosition8 {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
}

export interface BatSide8 {
    code: string;
    description: string;
}

export interface PitchHand8 {
    code: string;
    description: string;
}

export interface Venue3 {
    id: number;
    name: string;
    link: string;
    location: Location3;
    timeZone: TimeZone3;
    active: boolean;
    season: string;
}

export interface Location3 {
    address1: string;
    city: string;
    state: string;
    stateAbbrev: string;
    postalCode: string;
    country: string;
    defaultCoordinates?: DefaultCoordinates;
}

export interface DefaultCoordinates {
    latitude: number;
    longitude: number;
}

export interface TimeZone3 {
    id: string;
    offset: number;
    offsetAtGameTime: number;
    tz: string;
}

export interface Promotion {
    offerId: number;
    name: string;
    description?: string;
    order: number;
    offerType: string;
    teamId: number;
    displayIfPast: boolean;
    imageUrl: string;
    presentedBy?: string;
    sortKey?: string;
    thumbnailUrl?: string;
    distribution?: string;
}

export interface Broadcast {
    id: number;
    name: string;
    type: string;
    language: string;
    isNational: boolean;
    sourceUrl?: string;
    callSign: string;
    mediaState: MediaState;
    broadcastDate: string;
    mediaId: string;
    gameDateBroadcastGuid: string;
    homeAway: string;
    freeGame: boolean;
    availableForStreaming: boolean;
    postGameShow: boolean;
    mvpdAuthRequired: boolean;
}

export interface MediaState {
    mediaStateId: number;
    mediaStateCode: string;
    mediaStateText: string;
}

export interface Content {
    link: string;
    editorial: Editorial;
    media: Media;
    highlights: Highlights;
    summary: Summary;
    gameNotes: GameNotes;
}

export interface Editorial {}

export interface Media {
    epg?: Epg[];
    freeGame: boolean;
    enhancedGame: boolean;
}

export interface Epg {
    title: string;
    items: Item[];
}

export interface Item {
    mediaFeedType: string;
    freeGame: boolean;
    contentId: string;
    id: number;
    mediaState: string;
    mediaId: string;
}

export interface Highlights {}

export interface Summary {
    hasPreviewArticle?: boolean;
    hasRecapArticle?: boolean;
    hasWrapArticle?: boolean;
    hasHighlightsVideo?: boolean;
}

export interface GameNotes {}

export interface SeriesStatus {
    gameNumber: number;
    totalGames: number;
    isTied: boolean;
    isOver: boolean;
    wins: number;
    losses: number;
    description: string;
    shortDescription: string;
    shortName: string;
    abbreviation: string;
    winningTeam?: WinningTeam;
    losingTeam?: LosingTeam;
}

export interface WinningTeam {
    allStarStatus: string;
    id: number;
    name: string;
    link: string;
}

export interface LosingTeam {
    allStarStatus: string;
    id: number;
    name: string;
    link: string;
}

export interface Ticket {
    ticketType: string;
    ticketLinks: TicketLinks;
}

export interface TicketLinks {
    home: string;
}
