package bashan.adoptme.web.rest.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
/**
 * Utility class for HTTP headers creation.
 */
public final class HeaderUtil {

    private static final Logger log = LoggerFactory.getLogger(HeaderUtil.class);

    private HeaderUtil() {
    }

    public static HttpHeaders createAlert(String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-adoptMeApp-alert", message);
        headers.add("X-adoptMeApp-params", param);
        return headers;
    }

    public static HttpHeaders createEntityCreationAlert(String entityName, String param) {
        return createAlert("A new " + entityName + " is created with identifier " + param, param);
    }

    public static HttpHeaders createEntityUpdateAlert(String entityName, String param) {
        return createAlert("A " + entityName + " is updated with identifier " + param, param);
    }

    public static HttpHeaders createEntityDeletionAlert(String entityName, String param) {
        return createAlert("A " + entityName + " is deleted with identifier " + param, param);
    }

    public static HttpHeaders createFailureAlert(String entityName, String errorKey, String defaultMessage) {
        log.error("Entity processing failed, {}", defaultMessage);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-adoptMeApp-error", defaultMessage);
        headers.add("X-adoptMeApp-params", entityName);
        return headers;
    }

    public static HttpHeaders createCommentAlert() {
        return createAlert("Comment was sent successfully!", "");
    }

    public static HttpHeaders createAnimalDeletionAlert() {
        return createAlert("You removed your animal " +
            "from the animals you're giving for adoption.", "");
    }

    public static HttpHeaders createAnimalUpdateAlert(String name) {
        return createAlert("Details of " + name + " were updated successfully!", name);
    }

    public static HttpHeaders createNewAnimalForAdoptionAlert(String name) {
        return createAlert("You're giving " + name + " for adoption. " +
        "it's profile will be published for everyone to adopt.", name);
    }
}
