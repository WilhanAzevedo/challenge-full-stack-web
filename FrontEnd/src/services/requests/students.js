import { api } from "../config";

export default {
    getAllStudents: () =>
        api({
            method: "GET",
            url: "/students",
        }),
    getStudent: (id) =>
        api({
            method: "GET",
            url: "/students/" + id,
        }),
    createStudent: (data) =>
        api({
            method: "POST",
            url: "/students",
            data: data,
        }),
    updateStudent: (id, data) =>
        api({
            method: "PUT",
            url: "/students/" + id,
            data: data,
        }),
    deleteStudent: (id) =>
        api({
            method: "DELETE",
            url: "/students/" + id,
        }),
};
