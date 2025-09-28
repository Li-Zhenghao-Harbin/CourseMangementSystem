package org.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("Course")
@RequestMapping("/course")
@CrossOrigin(allowCredentials = "true", allowedHeaders = "*", originPatterns = "*")
public class CourseController {
}
