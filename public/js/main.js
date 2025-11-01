const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((e) => {
  e.addEventListener("click", deleteMovie);
});

Array.from(thumbText).forEach((e) => {
  e.addEventListener("click", addLike);
});

async function deleteMovie() {
  const t = this.parentNode.childNodes[1].innerText;
  const g = this.parentNode.childNodes[2].innerText;
  try {
    const response = await fetch("deleteMovie", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: t,
        genre: g,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function addLike() {
  // const titleText = this.parentNode.childNodes[1].innerText; // store the text
  // try {
  //   const response = await fetch("addLike", {
  //     method: "put",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: titleText,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   location.reload();
  // } catch (err) {
  //   console.error(err);
  // }
}
