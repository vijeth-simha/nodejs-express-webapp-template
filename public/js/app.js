const editor = Jodit.make("#course-description", {
	controls: {
		font: {
			list: {
				'Roboto Medium,,Arial,sans-serif': 'Roboto'
			}
		}
	}
});

const deleteCourse = async (courseID) => {
  postDeleteCourseData(courseID)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((error) => console.log(error));
};

const postDeleteCourseData = async (courseID) => {
  const { accessToken } = JSON.parse(localStorage.getItem("tokens"));
  const response = await fetch(`/api/v1/courses/delete-course/${courseID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};



const postCourseData = async (courseData) => {
  const { accessToken } = JSON.parse(localStorage.getItem("tokens"));
  const response = await fetch("/api/v1/courses/add-course", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: courseData,
  });
  return response;
};

const createCourse = (e) => {
  e.preventDefault();
  const formElement = document.querySelector("#courseCreateForm");
  const formData = new FormData(formElement);
  // formData.append("courseDescription",editor.value);
  postCourseData(formData)
    .then(async (response) => {
      window.location.href = "/courses";
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditCourseData = async (courseData, courseID) => {
  const { accessToken } = JSON.parse(localStorage.getItem("tokens"));
  const response = await fetch(`/api/v1/courses/edit-course/${courseID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: courseData,
  });
  return response;
};

const editCourse = (e, courseID) => {
  e.preventDefault();
  const formElement = document.querySelector("#courseEditForm");
  const formData = new FormData(formElement);
  postEditCourseData(formData, courseID)
    .then(async (response) => {
      window.location.href = "/courses";
    })
    .catch((err) => {
      console.log(err);
    });
};

