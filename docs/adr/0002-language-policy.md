# Language Policy

Date: 2025-08-09
Status: Accepted

Context:
The product targets English-speaking users and international collaborators. Mixed-language code or UI texts create inconsistency and maintenance risk.

Decision:

- All code, comments, identifiers, commit messages, UI copy, and documentation must be written in English.
- Externalized text resources should default to English. Localizations, if added, will live in separate resource files.

Consequences:

- Consistent developer experience and user-facing language.
- Prevents accidental non-English content from entering the codebase.
- Any contribution not following the policy will be requested to revise before merge.
