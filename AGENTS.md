<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application conventions
- Keep editable business data, services and the Europe/Zurich opening calculation in a browser-safe shared module; this keeps displayed hours and structured data consistent without server dependencies.
- Use the index route for the explicitly requested long scrolling website, with anchored sections; legal documents have separate routes and page-specific metadata.
- Define branding and interaction styles through global semantic tokens and shared Button variants, so all calls to action follow the same design system.
- Label generated salon imagery and unconfirmed offerings as placeholders; legal pages must identify missing ownership information rather than invent it.
