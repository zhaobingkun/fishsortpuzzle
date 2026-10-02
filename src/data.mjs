import { levelVideos } from './level-videos.mjs';
import { levelNotes } from './level-notes.mjs';

export const site = {
  name: 'Fish Sort Wiki',
  domain: 'https://fishsortpuzzle.app',
  googleAnalyticsId: 'G-P0R43X0ZMS',
  description: 'Play Fish Sort Puzzle online for free, then browse level walkthroughs, Wiki guides, booster help, events, and safe official download links.',
  gameName: 'Fish Sort Puzzle',
  developer: 'Shycheese',
  packageId: 'triple.sorting.bubble.fish.match',
  playStore: 'https://play.google.com/store/apps/details?id=triple.sorting.bubble.fish.match',
  featuredVideo: 'xej4MJiX3UQ',
  videoChannelName: 'Daisy Gaming',
  videoChannelUrl: 'https://www.youtube.com/@Infinty_craft',
  videoPlaylistUrl: 'https://www.youtube.com/playlist?list=PLJscotaJN_4w',
  videoLibraryChecked: '2026-09-30',
  webGameDeveloper: 'YIGOT',
  webGameSourceUrl: 'https://gamemonetize.com/fish-sort-puzzle-game',
  webGameEmbedUrl: 'https://html5.gamemonetize.games/diiob6luzs7e36nbbt1iz74wlvf4vo2d/',
  webGamePublished: '2026-09-30'
};

export const levels = levelVideos.map(([level, videoId]) => ({
  level,
  videoId,
  title: `Fish Sort Puzzle Level ${level} Walkthrough`,
  summary: levelNotes[level]?.description ?? `Watch the verified Fish Sort Puzzle Level ${level} video solution, compare the opening fish, and protect your holding slots before following the finish.`,
  verified: true,
  verifiedOn: site.videoLibraryChecked,
  source: site.videoChannelName
}));

const page = (slug, title, description, eyebrow, intro, sections, faqs = []) => ({
  slug, title, description, eyebrow, intro, sections, faqs
});

export const articles = [
  page('wiki/how-to-play', 'How to Play Fish Sort Puzzle', 'Learn the Fish Sort Puzzle rules, holding-slot limits, order goals, and the safest way to read a board before tapping.', 'Core mechanics',
    'Fish Sort Puzzle is a layered matching game: tap visible fish, move them into a limited holding area, and clear groups of three identical creatures while completing the tank orders shown for the level. The important decision is not simply finding a match. It is choosing a match that does not bury the next fish you need or consume every open slot.', [
      ['Read the orders first', 'Before tapping, identify the fish requested by the active tanks. A visible triple may look useful but can waste space when it does not advance an order. Start with matches that reveal useful fish underneath and move the current objective forward.'],
      ['Protect the holding bar', 'Every unmatched fish occupies a temporary slot. Count free spaces before selecting a new species, and avoid opening several unfinished triples at once. One completed group is usually safer than three promising pairs.'],
      ['Use the board in layers', 'Scan the top layer, then note which fish will become available after each clear. Good moves reveal another match; weak moves reveal a fish that cannot join anything already held.'],
      ['Reset with a reason', 'When a run fails, identify the first move that introduced an unnecessary species. Replaying with one corrected opening is more useful than changing every tap at random.']
    ], [
      ['What clears fish from the holding bar?', 'Three identical fish clear as a group when the match is completed.'],
      ['Why does a level end?', 'A run normally fails when the limited holding spaces fill before another triple clears.'],
      ['Is this guide official?', 'No. Fish Sort Wiki is an independent player guide and is not affiliated with Shycheese.']
    ]),
  page('wiki/boosters', 'Fish Sort Puzzle Boosters Guide', 'Understand when to use Fish Sort Puzzle boosters and how to avoid spending help on a board that should be restarted.', 'Wiki reference',
    'Boosters are most valuable when they repair a specific board problem. Using one immediately after a weak opening often postpones the same failure. First decide whether the board is recoverable, then choose the smallest tool that restores a safe match.', [
      ['Undo', 'Undo is strongest after one identifiable mistake, such as selecting a fish that opens a new unmatched species. It is less useful when several earlier taps created the problem.'],
      ['Shuffle', 'Shuffle can expose new matches when the visible layer has stalled. Before using it, note your current pairs so you can recognize whether the new layout actually improves the board.'],
      ['Extra slot or extra aquarium space', 'An extra space buys time; it does not solve the ordering problem by itself. Use it when one additional fish immediately completes a triple or exposes the final order item.'],
      ['When to restart instead', 'Restart when the holding bar contains several unrelated singles and no near-term triple is visible. Saving a booster for a close finish is usually more efficient.']
    ]),
  page('wiki/fish-collection', 'Fish Collection and Species', 'A practical guide to tracking Fish Sort Puzzle fish species without confusing decorative fish with playable match pieces.', 'Collection Wiki',
    'Fish Sort Puzzle uses its sea creatures as both match pieces and collection rewards. Because events and updates can add or reskin creatures, this Wiki records only species observed in the current Shycheese version and separates confirmed gameplay pieces from decorative aquarium inhabitants.', [
      ['Confirmed versus unconfirmed entries', 'A species should be added only after it appears in gameplay, the collection screen, or an official store screenshot. Names inferred from appearance should be marked as descriptive labels, not official names.'],
      ['Rarity and event fish', 'Limited-time fish may be tied to seasonal events or reward tracks. Record the event name, date, unlock requirement, and whether the fish remains available afterward.'],
      ['Useful screenshots', 'Capture the collection entry, its unlock source, and one in-level appearance. Cropped screenshots help players identify a fish without reproducing more game artwork than necessary.'],
      ['Community submissions', 'Future submissions should include the app version and a clear source image. Duplicate color variants should not be listed as separate species until the game treats them separately.']
    ]),
  page('wiki/aquarium', 'Aquarium and Fishbowl Guide', 'Learn how the Fish Sort Puzzle aquarium relates to collection progress, temporary level help, and visual upgrades.', 'Aquarium Wiki',
    'The aquarium is the long-term collection layer around the matching puzzles. Players should distinguish permanent collection progress from temporary help purchased or earned for a single level, especially when a fishbowl or extra container appears during play.', [
      ['Collection space', 'The home aquarium displays progress and gives collected creatures a persistent place outside individual puzzles. Its contents can change as new species and events arrive.'],
      ['Temporary level containers', 'A container offered during a difficult level may apply only to that run. Read the confirmation text before spending coins or watching an advertisement.'],
      ['Decorations', 'Treat decorations as cosmetic unless the game explicitly describes a gameplay effect. Record unlock requirements separately from strategy advice.'],
      ['Before spending currency', 'Check whether the purchase is permanent, event-limited, or single-use. This distinction should be visible in every future Wiki entry.']
    ]),
  page('wiki/coins-and-rewards', 'Coins, Rewards, and Ad Bonuses', 'Understand Fish Sort Puzzle coins, reward ads, and the checks to make before spending currency or watching another video.', 'Economy Wiki',
    'Coins and advertisement rewards can provide additional help, but the exact balance may change between versions or regions. This guide focuses on decisions that remain useful even when reward amounts change.', [
      ['Treat displayed values as version-specific', 'Record the app version and date whenever documenting a price or reward. Avoid promising a fixed amount based on an older screenshot.'],
      ['Reward ads', 'Wait for the completion message before closing an advertisement. If the game does not grant the reward, capture the time and ad placement before restarting.'],
      ['Best use of coins', 'Spend on a board that is already close to completion, not on repeated attempts with the same weak opening.'],
      ['Purchases', 'Use only the in-game store and official storefront billing. Fish Sort Wiki never sells coins, accounts, or modified applications.']
    ]),
  page('wiki/events', 'Fish Sort Puzzle Events Wiki', 'Track Fish Sort Puzzle events, limited rewards, pearl hunts, and the information players should verify before an event ends.', 'Live content',
    'Events create short-term goals beyond ordinary level progression. Each event page should record its visible dates, qualifying actions, reward track, and app version, then clearly mark the event as ended when it is no longer active.', [
      ['Event verification', 'Use the in-game event panel or official store listing as the primary source. Social posts and videos can supplement details but should not override the dates shown in the game.'],
      ['Progress requirements', 'Explain exactly which levels or matches count. If progress is inconsistent, note the observed conditions instead of presenting a guess as a rule.'],
      ['Limited rewards', 'Separate guaranteed milestone rewards from random drops and paid offers. Players should know what can be earned without a purchase.'],
      ['Archive value', 'Expired event pages remain useful when they document mechanics that return. Add an ended label and link to the current event hub.']
    ]),
  page('events/pearl-hunt', 'Pearl Hunt Event Guide', 'Fish Sort Puzzle Pearl Hunt guide covering how to verify qualifying levels, protect progress, and claim rewards before the event ends.', 'Limited-time event',
    'Pearl Hunt is a limited-time event surfaced in the official store listing. Clear qualifying levels and match the requested pieces while the event is active, but confirm the current rules inside the game because dates and reward thresholds can change.', [
      ['Check the timer', 'Open the event panel before a long play session and note the local end time. Store promotions can end on a different schedule from the in-game panel.'],
      ['Confirm what counts', 'After one level, compare your pearl total before and after. This establishes whether ordinary clears, specific matches, or only event stages add progress.'],
      ['Claim completed milestones', 'Collect each unlocked reward when it becomes available. Do not assume unclaimed rewards will be mailed after the event closes.'],
      ['Troubleshooting missing progress', 'Restart the game after confirming a stable connection, then capture the event screen and app version if progress remains missing.']
    ]),
  page('guides/beginner-guide', 'Fish Sort Puzzle Beginner Guide', 'A beginner strategy for Fish Sort Puzzle: read tank orders, manage holding slots, and build one complete triple at a time.', 'Start here',
    'The safest beginner habit is to slow down before the first tap. Read the tank orders, count the open holding spaces, and identify one triple you can finish without introducing too many other fish.', [
      ['Plan one complete match', 'Prefer a visible pair with a reachable third fish over three separate singles. Completing a group immediately returns space to the holding bar.'],
      ['Reveal with purpose', 'Choose a top fish because you need what is underneath it, not only because it is available.'],
      ['Keep one recovery slot', 'Try to leave at least one empty holding space. That margin lets you uncover a needed fish without ending the run.'],
      ['Learn from the first failure', 'On a retry, change the earliest questionable tap. Later moves often become easier once the opening order is corrected.']
    ]),
  page('guides/slot-management', 'Holding Slot Strategy', 'Stop filling the holding bar in Fish Sort Puzzle with a simple system for pairs, singles, and safe reveals.', 'Strategy guide',
    'Most difficult levels are decided by slot management. The board may contain every fish you need, but selecting them in the wrong order leaves no room to reach the final member of a triple.', [
      ['Count active species', 'Each different fish type in the bar is an unfinished commitment. Limit how many species you open at once.'],
      ['Pairs are useful, not automatically safe', 'A pair still occupies two spaces. Keep it only when the third fish is visible or will be revealed by the next clear.'],
      ['Prioritize chain reveals', 'The best triple clears space and exposes another fish that joins an existing pair. Look for these two-step sequences.'],
      ['Know the reset point', 'If every visible choice adds a new species and no triple is close, restart before spending a booster.']
    ]),
  page('guides/hard-levels', 'How to Beat Hard Levels', 'A repeatable method for difficult Fish Sort Puzzle levels using screenshots, video checkpoints, and controlled retries.', 'Advanced strategy',
    'Hard levels become manageable when each retry answers one question. Capture the opening board, compare it with a verified walkthrough, and identify where your holding bar first diverges from the successful run.', [
      ['Record the opening', 'A screenshot preserves the starting layers and orders. It also helps confirm whether an update changed the board.'],
      ['Use videos as checkpoints', 'Pause after the first completed triple and again before the final order. You rarely need to copy every tap.'],
      ['Test one change', 'Adjust the first move that caused unnecessary slot pressure, then keep the rest of the route stable long enough to judge it.'],
      ['Spend help near the finish', 'Boosters create the most value when the remaining path is understood and one extra action completes it.']
    ]),
  page('guides/ads-and-rewards', 'Ads and Reward Guide', 'What to do when Fish Sort Puzzle ads interrupt a level, fail to grant a booster, or return to the wrong screen.', 'Player support',
    'Advertisement behavior can vary by network, region, and game version. If a rewarded video fails, avoid watching several more immediately; first confirm whether the original reward arrived after a short delay or restart.', [
      ['Before watching', 'Use a stable connection and note the reward being offered. Do not tap multiple reward buttons while an advertisement is loading.'],
      ['After the ad', 'Wait for the game confirmation and return animation. Closing the ad at the first visible close button can sometimes interrupt reward reporting.'],
      ['When the game restarts', 'Reopen the level and check currency or booster totals before repeating the ad. Capture evidence if the result is still missing.'],
      ['Report useful details', 'Include device model, operating system, app version, approximate time, and the location of the ad in the game.']
    ]),
  page('troubleshooting/ads-not-rewarding', 'Reward Ad Did Not Work', 'Steps to check a missing Fish Sort Puzzle ad reward before replaying the advertisement or contacting support.', 'Troubleshooting',
    'A missing reward can be a delayed balance update, an interrupted advertisement callback, or a temporary network problem. Check the reward state methodically so you do not spend more time watching the same ad.', [
      ['Check the balance', 'Return to the relevant booster or currency screen and compare the total. Some rewards arrive without a separate animation.'],
      ['Restart once', 'Close and reopen the game after confirming your progress is synced. Repeated force-closing during an ad can make the issue harder to diagnose.'],
      ['Change networks carefully', 'Try a stable Wi-Fi or mobile connection before another attempt, but avoid switching while the ad is playing.'],
      ['Contact support', 'Use the in-game support route or the verified store contact and include screenshots, version, device, and time.']
    ]),
  page('troubleshooting/progress-lost', 'Lost Progress or Restarted Level', 'Fish Sort Puzzle progress recovery checks for interrupted levels, device changes, and apparent reward rollbacks.', 'Troubleshooting',
    'First determine whether the loss affects one level attempt, event progress, currency, or the entire save. These cases have different causes and should not be reported as the same problem.', [
      ['One level restarted', 'An interrupted app session may restart the active board without affecting permanent progression. Confirm your unlocked level number on the level map.'],
      ['Event progress changed', 'Check whether the event ended, refreshed, or requires an online sync. Save a screenshot of the timer and milestone track.'],
      ['Device change', 'Use only the game account or platform sync method presented in the app. Do not share account credentials with recovery services.'],
      ['Prepare a support request', 'Record the last known level, approximate balance, device, app version, and when the change occurred.']
    ]),
  page('troubleshooting/battery-drain', 'Battery Drain and Performance Fixes', 'Reduce Fish Sort Puzzle battery drain, heat, stutter, and reloads with safe device and game checks.', 'Troubleshooting',
    'Animated aquarium scenes, advertisement playback, and long sessions can increase device load. Begin with reversible settings and operating-system checks before reinstalling the game.', [
      ['Close background work', 'Stop other games, video apps, or screen recording before testing performance again.'],
      ['Reduce heat', 'Pause charging during a long session when practical, remove a heat-trapping case, and let the device cool before retrying.'],
      ['Check updates', 'Install the latest official game update and stable operating-system release available for the device.'],
      ['Reinstall only after sync', 'Confirm account or platform progress is backed up before uninstalling. Fish Sort Wiki does not provide recovery files.']
    ])
];

export const hubs = {
  wiki: {
    title: 'Fish Sort Puzzle Wiki',
    description: 'Browse verified Fish Sort Puzzle mechanics, boosters, fish collection, aquarium, rewards, and event references.',
    intro: 'The Wiki records facts that can be verified in the Shycheese version of Fish Sort Puzzle. It separates confirmed mechanics from observations that may change with an update.',
    slugs: ['wiki/how-to-play', 'wiki/boosters', 'wiki/fish-collection', 'wiki/aquarium', 'wiki/coins-and-rewards', 'wiki/events']
  },
  guides: {
    title: 'Fish Sort Puzzle Guides',
    description: 'Beginner help, holding-slot strategy, hard-level methods, and advertisement guidance for Fish Sort Puzzle.',
    intro: 'Use these guides when you need a repeatable strategy rather than one exact level solution.',
    slugs: ['guides/beginner-guide', 'guides/slot-management', 'guides/hard-levels', 'guides/ads-and-rewards']
  },
  troubleshooting: {
    title: 'Fish Sort Puzzle Troubleshooting',
    description: 'Fix missing ad rewards, apparent progress loss, battery drain, and common Fish Sort Puzzle problems safely.',
    intro: 'Start with the least destructive check. Do not reinstall until you have confirmed how game progress is stored and synced.',
    slugs: ['troubleshooting/ads-not-rewarding', 'troubleshooting/progress-lost', 'troubleshooting/battery-drain']
  },
  events: {
    title: 'Fish Sort Puzzle Events',
    description: 'Current and archived Fish Sort Puzzle event guides, dates, qualifying actions, and reward checks.',
    intro: 'Event details can change by version or region. Verify the timer and rules shown inside the game before spending currency or planning a long session.',
    slugs: ['events/pearl-hunt']
  }
};
