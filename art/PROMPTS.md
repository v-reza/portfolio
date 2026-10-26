# Painted art: generation prompts

Style: **Mooi Indië oil painting**. View: **from a train window**. The train moves through the day, from dawn in Malang to night at Bromo, so the site needs no separate night images.

## How to deliver

- Save every result as PNG at the highest resolution the tool gives you, into `art/raw/`, with the **exact file name** listed below.
- Generate **P1 first**. Then attach P1 as a style reference for everything else:
  - Midjourney: `--sref <P1 url>`
  - Gemini / ChatGPT: attach P1 and add "same painting style, palette and brushwork as the attached image".
- If a result has text, signs, a watermark or a modern train in the foreground, regenerate it.

### Per-tool settings

| Tool | Panorama panels (P1–P6) | Everything else |
|---|---|---|
| Midjourney v7 | append `--ar 21:9 --style raw` | use the aspect ratio given per prompt |
| Gemini (Nano Banana / Imagen) | choose 21:9 | use the aspect ratio given per prompt |
| ChatGPT | it only does 3:2 landscape (1536×1024). Fine: I crop to 21:9, so keep important things in the **middle 65% of the height** | same |

## Shared style block

Paste this at the start of **every** prompt:

> Mooi Indië school oil painting, in the manner of 1920s–1930s Indonesian landscape painters such as Wakidi and Abdullah Suriosubroto, loose impasto brushwork on visible canvas texture, soft atmospheric perspective, lush tropical greens, cumulus clouds, calm idyllic mood, painterly, not photographic, no text, no lettering, no signs, no watermark, no frame.

## P1–P6: the panorama seen through the train window

Add this block to **each** panel, after the style block:

> Ultra-wide panorama at eye level, as seen from the window of a moving train. The horizon line sits at 45% from the top. Nothing in the immediate foreground (no tracks, no window frame, no people close to the viewer). The far-left and far-right edges are open rice fields and sky, so the panel can join seamlessly with the panels next to it.

Then the scene:

| File | Scene |
|---|---|
| `p1-malang-dawn.png` | Dawn over Malang, East Java. Whitewashed Dutch colonial houses with red clay-tile roofs, the white Tugu Malang obelisk in a round pond with lotus flowers, tamarind trees along the road, the Mount Arjuno range behind in blue haze, first pink and gold light, thin morning mist over the town. |
| `p2-highlands.png` | Morning in the East Java highlands. Terraced rice fields and rows of tea plantation curving over rolling hills, the perfect cone of Mount Semeru on the horizon with a small plume of smoke, bamboo farm huts, coconut palms, clouds building. |
| `p3-yogyakarta.png` | Late morning near Yogyakarta. A wide plain of rice paddies with farmers in conical caping hats, the stone spires of Prambanan temple on the left, Mount Merapi with a soft plume behind, water buffalo resting, bright tropical light. |
| `p4-strait-singapore.png` | Midday on the coast. A calm sea strait with traditional pinisi sailing ships and fishing outriggers, coconut palms on a sandy shore at the left, and far across the water on the horizon a faint hazy modern skyline suggesting Singapore (Marina Bay Sands silhouette, very small and distant, painted softly in the same oil style). Big tropical clouds. |
| `p5-batu-studio.png` | Golden afternoon in the hills of Batu near Malang. Apple orchards and vegetable terraces, a small modern studio building with large glass windows and a timber roof among the orchards, warm light, long shadows, Mount Panderman behind. |
| `p6-bromo-night.png` | Dusk turning into night. The sea of sand of Mount Bromo, the smoking Bromo crater and the ridged cone of Mount Batok, a purple-blue sky with the first stars and a crescent moon, warm lights of a small village, and a lantern-lit small railway station at the far-right edge. Quiet and magical. |

## F1–F2: fast foreground layers for parallax

These scroll faster than the panorama to give depth. Add:

> Isolated foreground elements for a parallax layer, seen very close from a moving train with slight motion blur, on a perfectly flat pure green background (#00FF00), nothing else on the background, no ground plane, no shadows on the green. Ultra-wide 21:9.

| File | Elements |
|---|---|
| `f1-poles-grass.png` | A row of old wooden telegraph poles with sagging wires, clumps of tall grass and wild shrubs along the bottom edge. |
| `f2-banana-bamboo.png` | Clumps of banana trees and leaning bamboo, a few coconut palm trunks, spaced out with gaps between them. |

## W1: the train carriage window (the frame around everything)

`w1-carriage-window.png`, **16:9**:

> Interior of a vintage Indonesian passenger train carriage, viewed straight on toward one large wide window. Warm teak window frame with rounded corners, cream cotton curtains tied back at both sides, a narrow wooden ledge under the window holding an open laptop, a glass of black kopi tubruk on a saucer and a paper train ticket. Warm soft daylight. The window glass area is filled with perfectly flat pure green (#00FF00): no view outside, no reflections. Symmetrical composition.

## O1: rantang (the "Stack" chapter object)

`o1-rantang.png`, **1:1**:

> Still life: a traditional Indonesian enamel rantang (stacked tiffin food carrier) with five tiers, cream enamel with a painted red and green floral pattern and a metal carrying handle, centred, soft light, on a perfectly flat pure green (#00FF00) background.

## O2: your portrait (optional, for "Off the clock")

`o2-portrait.png`, **4:5**. Attach a clear photo of yourself:

> Paint the person in the attached photo as a Mooi Indië style oil portrait, seated by a train window with soft daylight on the face, same painting style as the reference panorama. Keep the face recognisable.

## What I do with the files

- Key out the green (`#00FF00`) to make cut-out layers.
- Crop to 21:9 and blend the edges where neighbouring panels meet, so the panorama looks continuous.
- Export WebP/AVIF at several sizes.
- Station signs, labels and every other piece of text are built in code, never painted, so they stay sharp, translatable and readable by search engines.
