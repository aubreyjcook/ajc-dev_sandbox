#!/usr/bin/env bash
# Copy scripts/templates/<group> to <group>/[<tech>/]<name> and replace __NAME__.
set -euo pipefail

usage() {
  echo "usage: scripts/new-project.sh <group[/tech]> <name>" >&2
  echo "  groups: js php rust cpp css asm" >&2
  echo "  rust and cpp need no tech (single technology); the others do." >&2
  exit 1
}

if [[ $# -ne 2 ]]; then
  usage
fi

target="$1"
name="$2"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

group="${target%%/*}"
tech=""
if [[ "$target" == */* ]]; then
  tech="${target#*/}"
fi

case "$group" in
  js|php|rust|cpp|css|asm) ;;
  *)
    echo "unknown group: $group" >&2
    usage
    ;;
esac

if [[ ! "$name" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo "name must match ^[a-z][a-z0-9-]*$" >&2
  exit 1
fi

template="$root/scripts/templates/$group"
if [[ ! -d "$template" ]]; then
  echo "missing template: $template (group '$group' has no scaffold)" >&2
  exit 1
fi

if [[ -z "$tech" ]]; then
  case "$group" in
    rust|cpp) rel="$group/$name" ;;
    *)
      echo "group '$group' needs a technology, e.g. scripts/new-project.sh $group/<tech> $name" >&2
      exit 1
      ;;
  esac
else
  rel="$group/$tech/$name"
fi

dest="$root/$rel"
if [[ -e "$dest" ]]; then
  echo "already exists: $dest" >&2
  exit 1
fi

mkdir -p "$(dirname "$dest")"
cp -R "$template" "$dest"

if sed --version >/dev/null 2>&1; then
  sed_inplace=(sed -i)
else
  sed_inplace=(sed -i "")
fi

while IFS= read -r -d "" file; do
  "${sed_inplace[@]}" "s/__NAME__/${name}/g" "$file"
done < <(find "$dest" -type f -print0)

echo "created $rel"
echo "if it serves traffic, set a free port and add a row to PORTS.md"
