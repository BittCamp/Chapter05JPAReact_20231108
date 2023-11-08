package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "userimage")
@Getter
@Setter
public class UserUploadDTO {
	@Id
	@Column(name="seq")
	private int seq;
	
	@Column(name="imagename", length = 50)
	private String imageName; //상품명
	
	@Column(name="imagecontent", length = 4000)
	private String imageContent;
	
	@Column(name="imagefilename", nullable = false, length = 100)
	private String imageFileName; //UUID에서 얻은 이름
	
	@Column(name="imageoriginalname", nullable = false, length = 100)
	private String imageOriginalName; //이미지의 원래 이름
}
