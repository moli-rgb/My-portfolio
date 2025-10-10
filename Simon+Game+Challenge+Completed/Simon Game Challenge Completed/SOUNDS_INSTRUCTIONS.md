# Simon Game Sounds Replacement Instructions

The current Simon game is using drum sounds which are not appropriate for the game. Here's how to replace them with proper tone sounds:

## Required Sound Files

You need to replace the following files in the `sounds` folder:
- red.mp3 (should be a red tone/beep)
- blue.mp3 (should be a blue tone/beep)
- green.mp3 (should be a green tone/beep)
- yellow.mp3 (should be a yellow tone/beep)
- wrong.mp3 (should be an error sound)

## How to Get Proper Sounds

### Option 1: Download from online sources
1. Visit websites like:
   - https://freesound.org/
   - https://www.zapsplat.com/
   - https://www.soundsnap.com/

2. Search for "simon game sounds", "beep tones", or "electronic tones"

3. Download four different tone sounds for the colors and one error sound

### Option 2: Create your own sounds
1. Use audio editing software like Audacity (free)
2. Generate tones using the "Generate" → "Tone" feature
3. Create different pitch tones for each color:
   - Red: Low tone (e.g., 200Hz)
   - Blue: Medium-low tone (e.g., 300Hz)
   - Green: Medium-high tone (e.g., 400Hz)
   - Yellow: High tone (e.g., 500Hz)
   - Wrong: Dissonant sound or buzzer

### Option 3: Use online tone generators
1. Visit tone generator websites
2. Create and download the required tones
3. Save them with the correct filenames

## File Placement
Place all five sound files in the `sounds` folder:
```
sounds/
├── blue.mp3
├── green.mp3
├── red.mp3
├── yellow.mp3
└── wrong.mp3
```

## Testing
After replacing the files:
1. Open the Simon game in your browser
2. Press any key to start
3. Check that each color plays its corresponding tone
4. Test the wrong sound by making an incorrect move

The game should now have proper Simon game sounds instead of drum sounds.