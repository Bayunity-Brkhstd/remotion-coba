# Gemini Rules for Remotion Video Generator

1. **Architecture**: Always follow frame-based calculations with `useCurrentFrame()` and `useVideoConfig()`.
2. **Smooth Transitions**: Use `interpolate()` with `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }` and `spring()`. Never use CSS transitions.
3. **Bang Motion & Anti-PPT Principles** (Refer to `.agents/skills/bang-motion/`):
   - **One statement per shot**: Maximum ≤ 5 words per shot/scene. Avoid PPT slide bullet-points.
   - **Attention Hierarchy**: Headline/statement first, hero visual object/metric next, supporting detail last.
   - **Multi-layer Depth**: Use living backgrounds (`GrainyBackground`, animated mesh, horizon glow) rather than static flat colors.
   - **Dynamic Camera**: Use subtle breathing scale (`interpolate(frame, [0, 90], [0.95, 1.04])`) to avoid static presentation feel.
4. **Execution**:
   - Verify TypeScript: `npm run check`
   - Test compositions: `npm run test:composition [CompositionId]`
   - Render video: `npm run render [CompositionId] [outputPath] [props.json | --props-file path.json]`
