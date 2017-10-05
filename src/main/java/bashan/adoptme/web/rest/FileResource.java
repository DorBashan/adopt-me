package bashan.adoptme.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Date;

@RestController
public class FileResource
{
    private final Logger log = LoggerFactory.getLogger(FileResource.class);

    private final HttpServletRequest request;

    @Autowired
    public FileResource(HttpServletRequest request)
    {
        this.request = request;
    }

    public String uploadFileToDirectory(MultipartFile file, String uploadsDir) throws Exception
    {
        String uniqueFileName = generateUniqueFileName(file);
        File dest = new File(getFullPathWithCreation(uploadsDir) + File.separator + uniqueFileName);
        file.transferTo(dest);
        return uniqueFileName;
    }

    private String generateUniqueFileName(MultipartFile file)
    {
        return String.valueOf(new Date().getTime()) + "_" + file.getOriginalFilename();
    }

    private String getFullPathWithCreation(String uploadsDir)
    {
        String realPathToUploads =  request.getServletContext().getRealPath(uploadsDir);

        if(! new File(realPathToUploads).exists())
        {
            new File(realPathToUploads).mkdir();
        }

        log.info("realPathToUploads = {}", realPathToUploads);

        return realPathToUploads;
    }
}
