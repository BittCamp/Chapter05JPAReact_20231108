package user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import user.bean.UserUploadDTO;
import user.dao.UserUploadDAO;

@Service
@Transactional
public class UserUploadServiceImpl implements UserUploadService {

	@Autowired
	private UserUploadDAO userUploadDAO;

	@Override
	public void upload(List<UserUploadDTO> userImageList) {
		userUploadDAO.saveAll(userImageList);
	}

	@Override
	public List<UserUploadDTO> uploadList() {
		return userUploadDAO.findAllByOrderBySeqDesc();//쿼리 메소드
		
	}
	
	
}
