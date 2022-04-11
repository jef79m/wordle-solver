import json

with open("/home/jeff//wordle_sorted.json") as wordfile:
    wordlist = json.loads(wordfile.read())

bad_letters = "dieustcl"
not_letters = [
    "ar",
    "",
    "a",
    "",
    ""
]

good_letters = {x for pos in not_letters for x in pos}
perfect_letters = ["", "o", "r", "a", ""]


def check_perfect(word):
    for idx, l in enumerate(perfect_letters):
        if l and word[idx] != l:
            return False
    return True


def check_bad_letters(word):
    for idx, l in enumerate(word):
        if l in bad_letters and l != perfect_letters[idx]:
            return False
    return True


def check_not_letters(word):
    for idx, l in enumerate(word):
        if l in not_letters[idx]:
            return False
    return True


printed = 0
for word in wordlist:
    if not check_perfect(word):
        continue
    if not check_bad_letters(word):
        continue
    if not check_not_letters(word):
        continue
    if not all([x in word for x in good_letters]):
        continue

    print(word)
    printed += 1
    if printed > 10:
        break