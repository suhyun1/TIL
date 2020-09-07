import os
import datetime

HEADER = """# TIL

> 배운 것을 기록하자

"""

ignoreFolders = [".git", ".github", "엔지니어를-위한-블록체인-프로그래밍"]


def main():
    content = ""
    content += HEADER

    for root, dirs, files in os.walk("."):
        dirs.sort()

        if root == ".":
            for dir in ignoreFolders:
                try:
                    dirs.remove(dir)
                except ValueError:
                    pass
            continue

        folder = os.path.basename(root)
        content += "### {}\n\n".format(folder)

        files.sort(reverse=False, key=lambda f: os.path.getctime(folder + "/" + f))
        for file in files:
            print(os.path.basename(file))
            print(os.path.getmtime(folder+"/"+file))
            if os.path.basename(file).split(".")[1] == "md":
                name = os.path.basename(file).split(".")[0]
                name = name.replace("-", " ")
                content += "- [{}]({})\n".format(name, os.path.join(folder, file))
        content += "\n"

    with open("README.md", "w") as readme:
        readme.write(content)


if __name__ == "__main__":
    main()