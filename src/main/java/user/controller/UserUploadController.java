package user.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserUploadDTO;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserUploadController {
	
	@PostMapping(path="upload" , produces ="application/json;charset=UTF-8")
	public void upload( @ModelAttribute UserUploadDTO userUploadDTO,
						@RequestParam("img[]") List<MultipartFile> list,
						HttpSession session) {
		System.out.println("~~~~~~~~~~");
		
		//실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		//파일명만 모아서 DB로 보내기
		List<UserUploadDTO> userImageList = new ArrayList<UserUploadDTO>();
		
		for(MultipartFile img : list) {
			originalFileName = img.getOriginalFilename();
			System.out.println(originalFileName);
		
			fileName = "noname";
			
			file = new File(filePath, originalFileName);
			
			
			try {
				img.transferTo(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			UserUploadDTO dto = new UserUploadDTO();
			dto.setImageName(userUploadDTO.getImageName());
			dto.setImageContent(userUploadDTO.getImageContent());
			dto.setImageFileName(fileName);
			dto.setImageOriginalName(originalFileName);
			
			userImageList.add(dto);
			
		}//for
		System.out.println(userImageList);
	}
	
}
